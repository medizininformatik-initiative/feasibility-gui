import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FeasibilityQuery } from '../../../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { FeasibilityQueryResultService } from '../../../../../service/FeasibilityQuery/Result/FeasibilityQueryResult.service';
import { FeatureService } from 'src/app/service/Feature.service';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import {
  ResultDetailModalComponent,
  ResultDetailsModalComponentData,
} from '../result-detail-modal/result-detail-modal.component';

@Component({
  selector: 'num-simple-result',
  templateUrl: './simple-result.component.html',
  styleUrls: ['./simple-result.component.scss'],
})
export class SimpleResultComponent implements OnInit, OnDestroy {
  showSpinner = false;

  pollingTime: number;
  patientCountArray: string[] = [];

  queryResultRateLimit$: Observable<QueryResultRateLimit>;
  loadedResult = false;

  @Output()
  resultLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  feasibilityQuery: FeasibilityQuery;
  constructor(
    public dialog: MatDialog,
    private feasibilityQueryResultService: FeasibilityQueryResultService,
    private queryProviderService: FeasibilityQueryProviderService,
    private featureService: FeatureService
  ) {
    this.queryResultRateLimit$ = this.feasibilityQueryResultService.getDetailedResultRateLimit();
    this.pollingTime = this.featureService.getPollingTime();
  }

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.queryProviderService
      .getActiveFeasibilityQuery()
      .pipe(
        filter((feasibilityQuery) => feasibilityQuery.getInclusionCriteria().length > 0),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.doSend(),
        error: (err) => console.error('Error fetching feasibility query', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private doSend(): void {
    this.initializeState();
    this.feasibilityQueryResultService.doSendQueryRequest().subscribe({
      next: (result: QueryResult) =>
        result === null ? this.finalize() : this.handleResult(result),
      error: (error) => console.error('Error fetching query result', error),
      complete: () => this.finalize(),
    });
  }

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsModalComponentData>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const modal = this.dialog.open(ResultDetailModalComponent, dialogConfig);
    modal.afterClosed().subscribe().unsubscribe();
  }

  private initializeState(): void {
    this.loadedResult = false;
    this.showSpinner = true;
  }

  private handleResult(result: QueryResult): void {
    this.loadedResult = true;
    this.setPatientCount(result.getTotalNumberOfPatients());
    this.resultLoaded.emit(this.loadedResult);
  }

  /**
   * If the result array has fewer than 10 digits, pad it with leading '0' digits until its length is 10
   */
  private setPatientCount(totalNumberOfPatients: number): void {
    const patientCountArray = totalNumberOfPatients.toString().split('');
    const lengthOfDigitFields = 8;
    while (patientCountArray.length < lengthOfDigitFields) {
      patientCountArray.unshift('0');
    }
    this.patientCountArray = patientCountArray;
  }

  private finalize(): void {
    console.log('Finalize');
    this.loadedResult = true;
    this.showSpinner = false;
    this.queryProviderService.checkCriteria();
  }
}
