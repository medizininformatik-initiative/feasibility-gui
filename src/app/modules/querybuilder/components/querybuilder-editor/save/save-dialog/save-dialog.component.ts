/* eslint-disable */
import { AfterViewChecked, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { BackendService } from '../../../../service/backend.service'
import { Subscription } from 'rxjs'
import { MatRadioChange } from '@angular/material/radio'
import { FileSaverService } from 'ngx-filesaver'
import { ApiTranslator } from '../../../../controller/ApiTranslator'

export class SaveDialogComponentData {
  hasQuerySend: boolean | string
}
@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveDialogComponent implements OnInit, OnDestroy, AfterViewChecked {
  private subscriptionResult: Subscription
  private querySlotCountSubscription: Subscription
  hasQuerySend: boolean | string
  querySlotAvailable: boolean = false

  constructor(
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    private fileSaverService: FileSaverService,
    @Inject(MAT_DIALOG_DATA) public data: SaveDialogComponentData,
    private dialogRef: MatDialogRef<SaveDialogComponent, void>,
    private apiTranslator: ApiTranslator
  ) {
    this.hasQuerySend = data.hasQuerySend
  }

  query: Query
  title = ''
  comment = ''
  filename = ''
  saveWithQuery: boolean | string = false
  letQuerySave: boolean = false
  saveButtonDisabled: boolean = true
  downloadQuery: boolean = false

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.saveWithQuery = this.hasQuerySend
  }

  ngAfterViewChecked() {
    this.isQuerySlotAvailable()
    this.querySaveComparison()
  }

  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe()
    this.querySlotCountSubscription.unsubscribe()
  }

  querySentStatus(): void {
    if (typeof this.data.hasQuerySend === 'number') {
      this.hasQuerySend = true
    } else {
      this.hasQuerySend = false
    }
  }
  querySaveComparison() {
    this.querySentStatus()
    if (this.hasQuerySend && this.querySlotAvailable) {
      this.letQuerySave = true
    }
  }

  doSave(): void {
    if (this.downloadQuery) {
      this.doDownloadQuery()
    } else {
      this.subscriptionResult?.unsubscribe()
      this.subscriptionResult = this.backend
        .saveQuery(this.query, this.title, this.comment, this.saveWithQuery)
        .subscribe((response) => {})
    }
    this.dialogRef.close()
  }

  doDownloadQuery() {
    const queryString = JSON.stringify(this.apiTranslator.translateToV2(this.query))
    const fileData = new Blob([queryString], { type: 'text/plain;charset=utf-8' })
    this.fileSaverService.save(fileData, this.filename + '.json')
  }

  doDiscard(): void {
    this.dialogRef.close()
  }

  setQuerySaving(mode: MatRadioChange): void {
    if (mode.value === 'template') {
      this.saveWithQuery = false
      this.downloadQuery = false
    }
    if (mode.value === 'saveQuery') {
      this.saveWithQuery = this.hasQuerySend
      this.downloadQuery = false
    }
    if (mode.value === 'download') {
      this.downloadQuery = true
    }
    this.isEmpty()
  }

  isEmpty(): void {
    this.saveButtonDisabled = !(
      (this.downloadQuery && this.filename !== '') ||
      (!this.downloadQuery && this.title !== '')
    )
  }

  isQuerySlotAvailable(): void {
    this.querySlotCountSubscription = this.backend
      .getSavedQuerySlotCount()
      .subscribe((querySlotCount) => {
        this.querySlotAvailable = querySlotCount.total > querySlotCount.used ? true : false
      })
  }
}
