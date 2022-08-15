import { Component, Input, OnInit } from '@angular/core'
import { QueryResult } from '../../../../model/api/result/QueryResult'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import {
  ResultDetailsDialogComponentData,
  ResultDetailsDialogComponent,
} from '../result-details-dialog/result-details-dialog.component'
import { Observable, Subscription } from 'rxjs'
import { BackendService } from '../../../../service/backend.service'

@Component({
  selector: 'num-result-simple',
  templateUrl: './result-simple.component.html',
  styleUrls: ['./result-simple.component.scss'],
})
export class ResultSimpleComponent implements OnInit {
  @Input()
  resultObservable: Observable<QueryResult>

  @Input()
  result: QueryResult

  @Input()
  isResultLoaded: boolean

  @Input()
  showSpinner: boolean

  constructor(public dialog: MatDialog, public backend: BackendService) {}

  ngOnInit(): void {}

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig<ResultDetailsDialogComponentData>()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      resultObservable$: this.resultObservable,
      myResult: this.result,
      isResultLoaded: this.isResultLoaded,
    }
    this.dialog.open(ResultDetailsDialogComponent, dialogConfig)
  }
}
