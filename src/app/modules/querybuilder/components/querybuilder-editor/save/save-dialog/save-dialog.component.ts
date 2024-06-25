/*
import { BackendService } from '../../../../service/backend.service';
import { AfterViewChecked, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Query } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { QueryProviderService } from '../../../../service/query-provider.service';
import { Subscription } from 'rxjs';
import { UIQuery2StructuredQueryTranslatorService } from 'src/app/service/UIQuery2StructuredQueryTranslator.service';
/* eslint-disable */
/*
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
  hasQuerySend: boolean | string
  querySlotAvailable: boolean = false

  constructor(
    private UITranslator: UIQuery2StructuredQueryTranslatorService,
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    private fileSaverService: FileSaverService,
    @Inject(MAT_DIALOG_DATA) public data: SaveDialogComponentData,
    private dialogRef: MatDialogRef<SaveDialogComponent, void>
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

  ngAfterViewInit() {
    this.isQuerySlotAvailable()
  }

  ngAfterViewChecked() {
    this.querySaveComparison()
  }

  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe()
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
    const queryString = JSON.stringify(this.UITranslator.translateToStructuredQuery(this.query))
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
    this.backend.getSavedQuerySlotCount().subscribe((querySlotCount) => {
      this.querySlotAvailable = querySlotCount.total > querySlotCount.used ? true : false
    })
  }
}
*/
