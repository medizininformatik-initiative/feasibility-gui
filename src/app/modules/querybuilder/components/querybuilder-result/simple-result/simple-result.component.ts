import { BackendService } from '../../../service/backend.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
  } from '@angular/core';
import {
  endWith,
  Subscription,
  switchMap,
  takeWhile
  } from 'rxjs';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { FeasibilityQueryResultService } from '../../../../../service/FeasibilityQueryResult.service';
import { FeatureService } from '../../../../../service/Feature.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QueryResult } from '../../../../../model/Result/QueryResult';
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

  @Input()
  callsRemaining: number;

  @Input()
  callsLimit: number;

  @Output() resultGotten = new EventEmitter<boolean>();

  clickEventsubscription: Subscription;
  spinnerValue: number;
  pollingTime: number;
  interval;
  loadedResult = false;
  tempFeasQueryID = '1';
  withDetails = false;
  queryUrl: string;
  constructor(
    public dialog: MatDialog,
    public backend: BackendService,
    private featureService: FeatureService,
    private queryProviderService: FeasibilityQueryProviderService,
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
    this.getDetailedResultRateLimit();
    this.doSend();
  }

  ngOnDestroy(): void {
    this.clickEventsubscription?.unsubscribe();
  }

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsModalComponentData>();

    this.resultService.getResult(this.queryUrl, this.result.getQueryId(), true).subscribe(() => {
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

    //modal.componentInstance.resultGotten.subscribe((resultGotten: boolean) => {
    //this.resultGotten.emit(resultGotten);
    //});
  }

  startProgressSpinner(pollingTime: number): void {
    this.interval = setInterval(() => {
      if (this.pollingTime > 0) {
        // console.log(this.spinnerValue)
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
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.getDetailedResultRateLimit();
    this.queryProviderService
      .getFeasibilityQueryByID(this.tempFeasQueryID)
      .pipe(
        switchMap((query) => this.resultService.getPollingUrl(query.get(this.tempFeasQueryID))),
        switchMap((url) => {
          this.queryUrl = url;
          return this.resultService
            .getResultPolling(url, this.tempFeasQueryID, false)
            .pipe(endWith(null));
        }),
        takeWhile((x) => x != null)
      )
      .subscribe(
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
  }

  private handleError(error: any): void {
    console.log('error!');
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

  getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        if (error.error.issues !== undefined) {
          if (error.error.issues[0].code !== undefined) {
            //this.snackbar.displayErrorMessage(error.error.issues[0].code);
          }
        }
      }
    );
  }
}
