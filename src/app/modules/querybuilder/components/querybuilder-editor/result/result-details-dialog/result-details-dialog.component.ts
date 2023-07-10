import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QueryResult } from '../../../../model/api/result/QueryResult';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { map, share, switchAll, takeUntil, startWith } from 'rxjs/operators';
import { BackendService } from '../../../../service/backend.service';
import { FeatureService } from '../../../../../../service/feature.service';
import { SnackbarService } from 'src/app/core/components/snack-bar/snack-bar.component';

export class ResultDetailsDialogComponentData {
  resultObservable$: Observable<QueryResult>;
  myResult: QueryResult;
  isResultLoaded: boolean;
  gottenDetailedResult: boolean;
  resultUrl: string;
}

@Component({
  selector: 'num-result-details-dialog',
  templateUrl: './result-details-dialog.component.html',
  styleUrls: ['./result-details-dialog.component.scss'],
})
export class ResultDetailsDialogComponent implements OnInit {
  result: QueryResult;
  resultSubscription: Subscription;
  resultStatus: string;
  getStoredResult: boolean;

  @Output() resultGotten = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDetailsDialogComponentData,
    public dialogRef: MatDialogRef<ResultDetailsDialogComponent>,
    public snackbar: SnackbarService,
    public backend: BackendService,
    public featureService: FeatureService
  ) {
    if (this.data.isResultLoaded) {
      this.result = this.data.myResult;
    }
  }

  lowerBoundaryLocation: number = this.featureService.getLocationResultLowerBoundary();

  ngOnInit(): void {
    const detailedResultUrl = this.data.resultUrl + '/detailed-obfuscated-result';
    this.resultStatus = '';
    this.getDetailedResult(detailedResultUrl);
  }

  doClose(): void {
    this.resultSubscription?.unsubscribe();
    this.dialogRef.close();
  }

  getDetailedResult(url: string): void {
    this.resultSubscription = this.backend
      .getDetailedResult(url, this.data.gottenDetailedResult)
      .subscribe(
        (result) => {
          this.resultStatus = '200';
          if (result.issues !== undefined) {
            this.resultStatus = result.issues[0].code;
            this.snackbar.displayErrorMessage(this.snackbar.errorCodes[this.resultStatus]);
          } else {
            this.sortResult(result);
          }
          this.resultGotten.emit(true);
        },
        (error) => {
          if (error.status === 404) {
            this.resultStatus = '404';
            this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
          }
          if (error.status === 429) {
            this.resultStatus = '429';
            this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
          }
        },
        () => {
          console.log('done');
        }
      );
  }
  sortResult(resultTemp): void {
    this.result = resultTemp;
    this.result?.resultLines?.sort((a, b) => b.numberOfPatients - a.numberOfPatients);
  }
}
