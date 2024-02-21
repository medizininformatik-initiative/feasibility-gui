import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { QueryResult } from '../../../../model/api/result/QueryResult';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  ResultDetailsDialogComponentData,
  ResultDetailsDialogComponent,
} from '../result-details-dialog/result-details-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { BackendService } from '../../../../service/backend.service';
import { FeatureService } from '../../../../../../service/feature.service';
import { BooleanArraySupportOption } from 'prettier';
import { QueryResultRateLimit } from 'src/app/modules/querybuilder/model/api/result/QueryResultRateLimit';

@Component({
  selector: 'num-result-simple',
  templateUrl: './result-simple.component.html',
  styleUrls: ['./result-simple.component.scss'],
})
export class ResultSimpleComponent implements OnInit, OnDestroy {
  @Input()
  resultObservable: Observable<QueryResult>;

  @Input()
  result: QueryResult;

  @Input()
  isResultLoaded: boolean;

  @Input()
  resultFromSavedQuery: boolean;

  @Input()
  showSpinner: boolean;

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

  constructor(
    public dialog: MatDialog,
    public backend: BackendService,
    private featureService: FeatureService
  ) {
    this.clickEventsubscription?.unsubscribe();
    this.clickEventsubscription = this.featureService.getClickEvent().subscribe((pollingTime) => {
      clearInterval(this.interval);
      this.spinnerValue = 100;
      this.pollingTime = pollingTime;
      this.startProgressSpinner(pollingTime);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.clickEventsubscription?.unsubscribe();
  }

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsDialogComponentData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      resultObservable$: this.resultObservable,
      myResult: this.result,
      isResultLoaded: this.isResultLoaded,
      resultUrl: this.resultUrl,
      gottenDetailedResult: this.gottenDetailedResult,
    };

    const diag = this.dialog.open(ResultDetailsDialogComponent, dialogConfig);

    diag.componentInstance.resultGotten.subscribe((resultGotten: boolean) => {
      this.resultGotten.emit(resultGotten);
    });
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
}
