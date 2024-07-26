import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import { BackendService } from '../../../service/backend.service';
import { FeatureService } from '../../../../../service/Feature.service';
import { ResultProviderService } from '../../../../../service/Provider/ResultProvider.service';
import { FeasibilityQueryResultService } from '../../../../../service/FeasibilityQueryResult.service';
import { FeasibilityQueryResultDetailsListAdapter } from '../../../../../shared/models/TableData/Adapter/FeasibilityQueryResultDetailsListAdapter';
import { FeasibilityQueryResultDetailstListEntry } from '../../../../../shared/models/ListEntries/FeasibilityQueryResultDetailstListEntry';
import { TableData } from '../../../../../shared/models/TableData/InterfaceTableData';

export class ResultDetailsModalComponentData {
  resultID: string;
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
  resultStatus: string;
  adaptedData: TableData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDetailsModalComponentData,
    public dialogRef: MatDialogRef<ResultDetailModalComponent>,
    public backend: BackendService,
    private featureService: FeatureService,
    private resultProvider: ResultProviderService
  ) {
    /*if (this.data.isResultLoaded) {
      this.result = this.resultProvider.getResultByID(this.data.resultID)
    }*/
  }
  lowerBoundaryLocation: number = this.featureService.getLocationResultLowerBoundary();

  ngOnInit(): void {
    const detailedResultUrl = this.data.resultUrl + '/detailed-obfuscated-result';
    this.resultStatus = '';

    this.sortResult(this.resultProvider.getResultByID(this.data.resultID));
    this.adaptedData = FeasibilityQueryResultDetailsListAdapter.adapt(
      this.result.getResultLines() as unknown as FeasibilityQueryResultDetailstListEntry[]
    );
  }

  doClose(): void {
    this.dialogRef.close();
  }

  sortResult(resultTemp): void {
    this.result = resultTemp;
    this.result?.getResultLines()?.sort((a, b) => b.getNumberOfPatients() - a.getNumberOfPatients());
    console.log(this.result);
  }
}
