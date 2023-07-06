import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Query } from '../../model/api/query/query';
import { QueryProviderService } from '../../service/query-provider.service';
import { QueryResult } from '../../model/api/result/QueryResult';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { BackendService } from '../../service/backend.service';
import { map, share, switchAll, takeUntil } from 'rxjs/operators';
import { FeatureService } from '../../../../service/feature.service';
import { GroupFactory } from '../../controller/GroupFactory';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveDialogComponent } from './save/save-dialog/save-dialog.component';
import { MatRadioChange } from '@angular/material/radio';
import { QueryResultRateLimit } from '../../model/api/result/QueryResultRateLimit';
import { SnackbarService } from 'src/app/core/components/snack-bar/snack-bar.component';
@Component({
  selector: 'num-querybuilder',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;

  query: Query;

  result: QueryResult;

  resultsLargeEnough: boolean;

  resultUrl: string;

  showSpinningIcon = false;
  actionDisabledSend: boolean;
  actionDisabledReset: boolean;
  hasQuerySend: boolean | string = false;

  subscriptionPolling: Subscription;
  private subscriptionResult: Subscription;
  public resultObservable$: Observable<QueryResult>;
  loadedResult: boolean;
  gottenDetailedResult: boolean;
  callsLimit: number;
  callsRemaining: number;

  constructor(
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    if (window.history.state.preventReset) {
      this.query = this.queryProviderService.query();
    } else {
      this.doReset();
    }
    if (window.history.state.loadedResult) {
      this.result = window.history.state.loadedResult;
      this.loadedResult = true;
    } else {
      this.loadedResult = false;
    }

    this.gottenDetailedResult = false;
    this.getDetailedResultRateLimit();
  }

  updateResultGotten(resultGotten: boolean) {
    this.getDetailedResultRateLimit();
    this.gottenDetailedResult = resultGotten;
  }

  ngOnDestroy(): void {
    this.subscriptionPolling?.unsubscribe();
    this.subscriptionResult?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.actionDisabledSend = this.isActionDisabled('Send');
    this.actionDisabledReset = this.isActionDisabled('Reset');
    this.changeDetector.detectChanges();
  }

  isActionDisabled(button: string): boolean {
    if (button === 'Send') {
      return !(this.query.groups[0].inclusionCriteria.length > 0);
    }

    if (button === 'Reset') {
      return (
        !(this.query.groups[0].inclusionCriteria.length > 0) &&
        !(this.query.groups[0].exclusionCriteria.length > 0) &&
        !(this.query.groups.length > 1)
      );
    }
    return false;
  }

  storeQuery(query: Query): void {
    this.query = query;
    this.queryProviderService.store(query);
  }

  startRequestingResult(): void {
    const summaryResultUrl = this.resultUrl + '/summary-result';
    this.loadedResult = false;
    this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      map(() => this.backend.getSummaryResult(summaryResultUrl)),
      share(),
      switchAll()
    );
    this.subscriptionPolling = this.resultObservable$.subscribe(
      (result) => {
        this.resultsLargeEnough = false;
        this.result = result;
        if (result.queryId !== undefined) {
          this.hasQuerySend = result.queryId;
        } else {
          this.hasQuerySend = false;
        }
      },
      (error) => {
        this.showSpinningIcon = false;
        this.hasQuerySend = false;
        if (error.status === 404) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
        }
      },
      () => {
        console.log('done');
        if (this.resultsLargeEnough === false) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10004']);
        } else {
          this.loadedResult = true;
        }
        this.showSpinningIcon = false;
      }
    );
  }

  addGroup(): void {
    this.query.groups.push(GroupFactory.createGroup(this.query));
    this.storeQuery(this.query);
  }

  doSend(): void {
    this.gottenDetailedResult = false;
    this.loadedResult = false;
    this.resultUrl = '';
    this.result = undefined;
    this.showSpinningIcon = true;
    this.subscriptionResult?.unsubscribe();
    this.subscriptionPolling?.unsubscribe();
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.getDetailedResultRateLimit();
    this.subscriptionResult = this.backend.postQuery(this.query).subscribe((response) => {
      this.resultUrl = response.headers.get('location'); // response.location)
      this.startRequestingResult();
    });
  }

  doSave(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      hasQuerySend: this.hasQuerySend,
    };
    this.dialog.open(SaveDialogComponent, dialogConfig);
  }

  doReset(): void {
    this.query = QueryProviderService.createDefaultQuery();
    this.queryProviderService.store(this.query);
    this.result = null;
    this.gottenDetailedResult = false;
    this.loadedResult = false;
    this.getDetailedResultRateLimit();
  }

  setConsent(radio: MatRadioChange): void {
    this.query.consent = radio.value;
    this.storeQuery(this.query);
  }

  getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        if ('issues' in error.error) {
          if (error.error.issues.some((issue) => issue.code === 'FEAS-10001')) {
            this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10001']);
          }
        }
        if (error.error.issues.some((issue) => issue.code === 'FEAS-10002')) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
        }
      }
    );
  }
}
