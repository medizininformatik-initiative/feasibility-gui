import { BackendService } from '../../../service/backend.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeasibilityQuery } from '../../../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryResultService } from '../../../../../service/FeasibilityQueryResult.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ResultDetailModalComponent,
  ResultDetailsModalComponentData,
} from '../result-detail-modal/result-detail-modal.component';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { FeatureService } from '../../../../../service/Feature.service';

@Component({
  selector: 'num-simple-result',
  templateUrl: './simple-result.component.html',
  styleUrls: ['./simple-result.component.scss'],
})
export class SimpleResultComponent implements OnInit {
  showSpinner = false;

  obfuscatedPatientCountArray: string[] = [];

  resultCallsRemaining$: Observable<number>;
  resultCallsLimit$: Observable<number>;

  pollingTime: number;
  loadedResult = false;

  @Output()
  resultLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  feasibilityQuery: FeasibilityQuery;
  constructor(
    public dialog: MatDialog,
    public backend: BackendService,
    private resultService: FeasibilityQueryResultService,
    private queryProviderService: FeasibilityQueryProviderService,
    private featureService: FeatureService
  ) {
    this.resultCallsRemaining$ = this.resultService.getResultCallsRemaining();
    this.resultCallsLimit$ = this.resultService.callsLimit$;
    this.pollingTime = this.featureService.getPollingTime();
  }

  ngOnInit(): void {
    if (window.history.state.startPolling) {
      this.doSend();
    }
  }

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsModalComponentData>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const modal = this.dialog.open(ResultDetailModalComponent, dialogConfig);
    modal.afterClosed().subscribe().unsubscribe();
  }

  doSend(): void {
    this.initializeState();
    this.resultService.doSendQueryRequest().subscribe(
      (result) => this.handleResult(result),
      (error) => this.handleError(error),
      () => this.finalize()
    );
  }

  private initializeState(): void {
    this.loadedResult = false;
    this.showSpinner = true;
  }

  private handleResult(result: any): void {
    this.loadedResult = true;
    this.setObfuscatedPatientCount(result.getTotalNumberOfPatients());
    this.resultLoaded.emit(this.loadedResult);
  }

  /**
   * If the result array has fewer than 10 digits, pad it with leading '0' digits until its length is 10
   */
  private setObfuscatedPatientCount(totalNumberOfPatients: number): void {
    const obfuscatedPatientCount = this.backend.obfuscateResult(totalNumberOfPatients);
    const obfuscatedPatientCountArray = obfuscatedPatientCount.toString().split('');
    while (obfuscatedPatientCountArray.length < 8) {
      obfuscatedPatientCountArray.unshift('0');
    }
    this.obfuscatedPatientCountArray = obfuscatedPatientCountArray;
  }

  private handleError(error: any): void {
    this.showSpinner = false;
    if (error.status === 404) {
      // this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
    }
    if (error.status === 429) {
      // this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
    }
  }

  private finalize(): void {
    this.loadedResult = true;
    this.showSpinner = false;
    this.queryProviderService.checkCriteria();
  }
}
