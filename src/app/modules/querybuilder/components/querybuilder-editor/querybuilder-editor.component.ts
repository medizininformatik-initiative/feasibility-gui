import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { FeatureService } from '../../../../service/Feature.service';
import { GroupFactory } from '../../controller/GroupFactory';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { map, share, switchAll, takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { QueryProviderService } from '../../service/query-provider.service';
import { SaveDialogComponent } from './save/save-dialog/save-dialog.component';
import { SnackbarService } from 'src/app/core/components/snack-bar/snack-bar.component';
import { QueryResult } from 'src/app/model/result/QueryResult';
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
  loadedResult = false;
  resultFromSavedQuery: boolean;
  gottenDetailedResult: boolean;
  callsLimit: number;
  callsRemaining: number;
  hasInvalidCriteria = false;

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
      this.checkForInvalidCriteria();
    } else {
      this.doReset();
    }
    if (window.history.state.resultFromSavedQuery) {
      this.result = new QueryResult();
      this.result.totalNumberOfPatients = window.history.state.resultFromSavedQuery;
      //this.resultFromSavedQuery = true;
    } else {
      //this.resultFromSavedQuery = false;
    }

    this.gottenDetailedResult = false;
    this.getDetailedResultRateLimit();

    if (this.featureService.showUpdateInfo()) {
      this.snackbar.displayInfoMessage('UPDATE_NOTE');
    }
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
      return !(this.query.groups[0].inclusionCriteria.length > 0) || this.hasInvalidCriteria;
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
    this.checkForInvalidCriteria();
  }

  storeQueryResult(queryResult): void {
    this.queryProviderService.storeQueryResult(queryResult);
  }

  startRequestingResult(): void {
    const summaryResultUrl = this.resultUrl + '/summary-result';
    this.loadedResult = false;
    //this.resultFromSavedQuery = false;
    this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      map(() => this.backend.getSummaryResult(summaryResultUrl)),
      share(),
      switchAll()
    );
    this.subscriptionPolling = this.resultObservable$.subscribe(
      (result) => {
        this.result = result;
        this.storeQueryResult(this.result);
        if (result.queryId !== undefined) {
          this.hasQuerySend = result.queryId;
        }

        if (result.issues !== undefined) {
          if (result.issues[0].code !== undefined) {
            this.resultsLargeEnough = false;
          }
        } else {
          this.resultsLargeEnough = true;
          this.result = result;
          if (result.queryId !== undefined) {
            this.hasQuerySend = result.queryId;
          } else {
            this.hasQuerySend = false;
          }
        }
      },
      (error) => {
        console.log(error);
        this.showSpinningIcon = false;
        this.hasQuerySend = false;
        if (error.status === 404) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
        }
        if (error.status === 429) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
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
    this.hasInvalidCriteria = false;
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
        if (error.error.issues !== undefined) {
          if (error.error.issues[0].code !== undefined) {
            this.snackbar.displayErrorMessage(error.error.issues[0].code);
          }
        }
      }
    );
  }

  checkForInvalidCriteria(): void {
    this.hasInvalidCriteria = false;
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.isInvalid) {
            this.hasInvalidCriteria = true;
          }
        });
      });
    }
    if (this.hasInvalidCriteria) {
      //this.snackbar.displayInvalidQueryMessage();
    }
  }
}
