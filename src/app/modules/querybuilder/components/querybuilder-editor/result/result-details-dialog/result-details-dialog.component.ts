import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { QueryResult } from '../../../../model/api/result/QueryResult'

export class DialogData {
  result: QueryResult
}

@Component({
  selector: 'num-result-details-dialog',
  templateUrl: './result-details-dialog.component.html',
  styleUrls: ['./result-details-dialog.component.scss'],
})
export class ResultDetailsDialogComponent implements OnInit {
  // myresult: QueryResult

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ResultDetailsDialogComponent>
  ) {
    console.log(data.result.numberOfPatients)
    // this.myresult = data.result
  }

  ngOnInit(): void {}

  doClose(): void {
    this.dialogRef.close()
  }
}
