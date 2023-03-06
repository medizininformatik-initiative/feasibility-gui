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
import { MatCheckboxChange } from '@angular/material/checkbox';

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

  resultUrl: string;

  showSpinningIcon = false;
  actionDisabledSend: boolean;
  actionDisabledReset: boolean;
  hasQuerySend: boolean | string = false;

  subscriptionPolling: Subscription;
  private subscriptionResult: Subscription;
  public resultObservable$: Observable<QueryResult>;
  loadedResult: boolean;

  constructor(
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
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

  startRequestingResult(resultUrl: string): void {
    this.resultUrl = resultUrl + '/result';
    this.loadedResult = false;

    this.resultObservable$ = interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS)),
      map(() => this.backend.getResult(this.resultUrl)),
      share(),
      switchAll()
    );
    this.subscriptionPolling = this.resultObservable$.subscribe(
      (result) => {
        this.result = result;
        if (result.queryId !== undefined) {
          this.hasQuerySend = result.queryId;
        } else {
          this.hasQuerySend = false;
        }
      },
      (error) => {
        console.error(error);
        this.showSpinningIcon = false;
        this.hasQuerySend = false;
      },
      () => {
        console.log('done');
        //  this.resultUrl = ''
        this.showSpinningIcon = false;
        this.loadedResult = true;
      }
    );
  }

  addGroup(): void {
    this.query.groups.push(GroupFactory.createGroup(this.query));
    this.storeQuery(this.query);
  }

  doSend(): void {
    this.resultUrl = '';
    this.result = undefined;
    this.showSpinningIcon = true;
    this.subscriptionResult?.unsubscribe();
    this.subscriptionPolling?.unsubscribe();
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.subscriptionResult = this.backend.postQuery(this.query).subscribe((response) => {
      this.startRequestingResult(response.headers.get('location')); // response.location))
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
  }

  setCentralAnalysis(checked: MatCheckboxChange): void {
    this.query.consentCentral = checked.checked
    this.storeQuery(this.query);
  }
  setDistributedAnalysis(checked: MatCheckboxChange): void {
    this.query.consentDistr = checked.checked
    this.storeQuery(this.query);
  }
}
