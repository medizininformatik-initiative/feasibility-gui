/* eslint-disable */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { BackendService } from '../../../../service/backend.service'
import { Subscription } from 'rxjs'
import { MatRadioChange } from '@angular/material/radio'

export class SaveDialogComponentData {
  hasQuerySend: boolean | string
}
@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveDialogComponent implements OnInit, OnDestroy {
  private subscriptionResult: Subscription
  hasQuerySend: boolean | string

  constructor(
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    @Inject(MAT_DIALOG_DATA) public data: SaveDialogComponentData,
    private dialogRef: MatDialogRef<SaveDialogComponent, void>,
    private router: Router
  ) {
    this.hasQuerySend = data.hasQuerySend
  }

  query: Query
  title = ''
  comment = ''
  saveWithQuery: boolean | string = false
  letQuerySave: boolean

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.hasQuerySend === false ? (this.letQuerySave = true) : (this.letQuerySave = false)
    this.saveWithQuery = this.hasQuerySend
  }
  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe()
  }
  doSave(): void {
    this.subscriptionResult?.unsubscribe()
    this.subscriptionResult = this.backend
      .saveQuery(this.query, this.title, this.comment, this.saveWithQuery)
      .subscribe((response) => {
        console.log(response)
      })
    this.dialogRef.close()
    // this.router.navigate(['/querybuilder/overview'])
  }

  doDiscard(): void {
    this.dialogRef.close()
  }

  setQuerySaving(mode: MatRadioChange): void {
    if (mode.value === 'template') {
      this.saveWithQuery = false
    } else {
      this.saveWithQuery = this.hasQuerySend
    }
  }
}
