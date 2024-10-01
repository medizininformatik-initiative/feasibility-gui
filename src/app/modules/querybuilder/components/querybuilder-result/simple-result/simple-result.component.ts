import { BackendService } from '../../../service/backend.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { endWith, Subscription, switchMap, takeWhile } from 'rxjs';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { FeasibilityQueryResultService } from '../../../../../service/FeasibilityQueryResult.service';
import { FeatureService } from '../../../../../service/Feature.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import {
  ResultDetailModalComponent,
  ResultDetailsModalComponentData,
} from '../result-detail-modal/result-detail-modal.component';
import { FeasibilityQuery } from '../../../../../model/FeasibilityQuery/FeasibilityQuery';

@Component({
  selector: 'num-simple-result',
  templateUrl: './simple-result.component.html',
  styleUrls: ['./simple-result.component.scss'],
})
export class SimpleResultComponent implements OnInit, OnDestroy {
  @Input()
  result: QueryResult;

  @Input()
  isResultLoaded: boolean;

  @Input()
  resultFromSavedQuery: boolean;

  showSpinner = false;

  @Input()
  resultUrl: string;

  @Input()
  gottenDetailedResult: boolean;

  @Output()
  obfuscatedPatientCountArray: string[] = [];

  resultCallsRemaining: number;
  resultCallsLimit: number;
  clickEventsubscription: Subscription;
  spinnerValue: number;
  pollingTime: number;
  interval;
  loadedResult = false;
  withDetails = false;
  queryUrl: string;

  feasibilityQuery: FeasibilityQuery;
  constructor(
    public dialog: MatDialog,
    public backend: BackendService,
    private featureService: FeatureService,
    private resultService: FeasibilityQueryResultService
  ) {
    this.clickEventsubscription?.unsubscribe();
    this.clickEventsubscription = this.featureService.getClickEvent().subscribe((pollingTime) => {
      clearInterval(this.interval);
      this.spinnerValue = 100;
      this.pollingTime = pollingTime;
      this.startProgressSpinner(pollingTime);
    });
  }

  ngOnInit(): void {
    if (window.history.state.startPolling) {
      this.doSend();
    }
  }

  ngOnDestroy(): void {
    this.clickEventsubscription?.unsubscribe();
  }

  /**
   * If the result array has fewer than 10 digits, pad it with leading '0' digits until its length is 10
   */
  private setObfuscatedPatientCount(): void {
    const obfuscatedPatientCount = this.backend.obfuscateResult(
      this.result?.getTotalNumberOfPatients()
    );
    const obfuscatedPatientCountArray = obfuscatedPatientCount.toString().split(''); // Convert the result into an array of digits
    while (obfuscatedPatientCountArray.length < 8) {
      obfuscatedPatientCountArray.unshift('0');
    }
    this.obfuscatedPatientCountArray = obfuscatedPatientCountArray; // Store it in the component
  }

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsModalComponentData>();

    this.resultService.getResult(this.queryUrl, true).subscribe(() => {
      const modal = this.dialog.open(ResultDetailModalComponent, dialogConfig);
      modal
        .afterClosed()
        .subscribe(() => (this.withDetails = false))
        .unsubscribe();
    });

    this.withDetails = true;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      resultID: this.result.getQueryId(),
      isResultLoaded: this.isResultLoaded,
      resultUrl: this.resultUrl,
      gottenDetailedResult: this.gottenDetailedResult,
    };
  }

  startProgressSpinner(pollingTime: number): void {
    this.interval = setInterval(() => {
      if (this.pollingTime > 0) {
        this.pollingTime--;
        this.spinnerValue = this.spinnerValue - 100 / pollingTime;
      } else {
        this.pollingTime = pollingTime;
        this.spinnerValue = 100;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  /**
   * need better pipe ending -> https://stackoverflow.com/questions/47031924/when-using-rxjs-why-doesnt-switchmap-trigger-a-complete-event
   *
   */
  doSend(): void {
    this.initializeState();
    this.getRemainingCalls();
    this.resultService.doSendQueryRequest().subscribe(
      (result) => this.handleResult(result),
      (error) => this.handleError(error),
      () => this.finalize()
    );
  }

  private initializeState(): void {
    this.gottenDetailedResult = true;
    this.loadedResult = false;
    this.resultUrl = '';
    this.result = undefined;
    this.showSpinner = true;
  }

  private handleResult(result: any): void {
    this.result = result;
    this.loadedResult = false;
    this.setObfuscatedPatientCount();
  }

  private handleError(error: any): void {
    this.showSpinner = false;
    // Optional: Handle error status codes
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
  }

  public getRemainingCalls() {
    this.resultCallsLimit = this.resultService.getCallsLimit();
    const callsRemaining = this.resultService.getCallsRemaining();
    this.resultCallsRemaining = this.resultCallsLimit - callsRemaining;
  }
}
