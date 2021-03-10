import { Component, Input, OnInit } from '@angular/core'
import { QueryResult } from '../../../../model/api/result/QueryResult'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { ResultDetailsDialogComponent } from '../result-details-dialog/result-details-dialog.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-result-simple',
  templateUrl: './result-simple.component.html',
  styleUrls: ['./result-simple.component.scss'],
})
export class ResultSimpleComponent implements OnInit {
  @Input()
  result: QueryResult

  // private dialogRef: MatDialogRef<ResultDetailsDialogComponent>
  // private subscriptionResult: Subscription

  constructor(public dialog: MatDialog) {}

  // numbers = 0;

  // subscriptionResult = this.dialog.subscribe(value => {
  //  if (this.dialogRef && this.dialogRef.componentInstance) {
  //    this.dialogRef.componentInstance.data = {numbers: value};
  //  }
  // });

  ngOnInit(): void {}

  openDialogResultDetails(): void {
    const dialogConfig = new MatDialogConfig()

    //  dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      result: this.result,
    }

    const dialogRef = this.dialog.open(ResultDetailsDialogComponent, dialogConfig)
  }
}
