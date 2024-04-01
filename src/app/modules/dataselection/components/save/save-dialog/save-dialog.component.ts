/* eslint-disable */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { Query as QueryOld } from 'src/app/modules/querybuilder/model/api/query/query'
import { MatRadioChange } from '@angular/material/radio'
import { FileSaverService } from 'ngx-filesaver'
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service'
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service'
import { ApiTranslator } from 'src/app/modules/querybuilder/controller/ApiTranslator'
import { Query } from 'src/app/model/FeasibilityQuery/Query'
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
    private fileSaverService: FileSaverService,
    private apiTranslator: ApiTranslator,
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
  letQuerySave: boolean
  saveButtonDisabled: boolean = true
  downloadQuery: boolean = false

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.hasQuerySend === false ? (this.letQuerySave = true) : (this.letQuerySave = false)
    this.saveWithQuery = this.hasQuerySend
  }
  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe()
  }
  doSaveForDataselection(): void {
    const queryString = JSON.stringify(
      this.apiTranslator.translateForDataselection(this.query as unknown as QueryOld)
    )
    const fileData = new Blob([queryString], { type: 'text/plain;charset=utf-8' })
    this.fileSaverService.save(fileData, this.filename + '.json')
    this.dialogRef.close()
    // this.router.navigate(['/querybuilder/overview'])
  }

  doDiscard(): void {
    this.dialogRef.close()
  }
  isEmpty(): void {
    this.saveButtonDisabled = !(this.title && this.filename !== '')
  }
}
