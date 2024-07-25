import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import { BackendService } from '../../../service/backend.service';
import { FeatureService } from '../../../../../service/Feature.service';

export class ResultDetailsModalComponentData {
  resultObservable$: Observable<QueryResult>;
  myResult: QueryResult;
  isResultLoaded: boolean;
  gottenDetailedResult: boolean;
  resultUrl: string;
}
@Component({
  selector: 'num-result-detail-modal',
  templateUrl: './result-detail-modal.component.html',
  styleUrls: ['./result-detail-modal.component.scss'],
})
export class ResultDetailModalComponent implements OnInit {
  @Output() resultGotten = new EventEmitter<boolean>();

  result: QueryResult;
  resultSubscription: Subscription;
  resultStatus: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDetailsModalComponentData,
    public dialogRef: MatDialogRef<ResultDetailModalComponent>,
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
            //this.snackbar.displayErrorMessage(this.snackbar.errorCodes[this.resultStatus]);
          } else {
            this.sortResult(result);
          }
          this.resultGotten.emit(true);
        },
        (error) => {
          if (error.status === 404) {
            this.resultStatus = '404';
            //this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
          }
          if (error.status === 429) {
            this.resultStatus = '429';
            //this.snackbar.displayErrorMessage(this.snackbar.errorCodes['FEAS-10002']);
          }
        },
        () => {
          console.log('done');
        }
      );
  }
  sortResult(resultTemp): void {
    this.result = resultTemp;
    this.result?.getResultLines()?.sort((a, b) => b.getNumberOfPatients() - a.getNumberOfPatients());
    console.log(this.result);
  }
}
