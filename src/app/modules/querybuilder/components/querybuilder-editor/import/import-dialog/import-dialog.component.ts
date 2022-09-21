import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FeatureProviderService } from '../../../../service/feature-provider.service'
import { IAppConfig } from '../../../../../../config/app-config.model'
import { Query } from '../../../../model/api/query/query'
import { ApiTranslator } from '../../../../controller/ApiTranslator'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MatDialogRef } from '@angular/material/dialog'
import { ObjectHelper } from '../../../../controller/ObjectHelper'

@Component({
  selector: 'num-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent implements OnInit, AfterViewChecked {
  private features: IAppConfig
  queryVersion: string
  importQuery: Query
  querySnapshot: Query
  actionDisabled: boolean
  query: Query

  constructor(
    public featureProviderService: FeatureProviderService,
    private changeDetector: ChangeDetectorRef,
    public queryProviderService: QueryProviderService,
    public dialogRef: MatDialogRef<ImportDialogComponent, Query>
  ) {
    this.querySnapshot = ObjectHelper.clone(queryProviderService.query())
  }

  ngOnInit(): void {
    this.features = this.featureProviderService.getFeatures()
    this.queryVersion = this.features.queryVersion
  }

  ngAfterViewChecked(): void {
    this.importQuery ? (this.actionDisabled = false) : (this.actionDisabled = true)
    this.changeDetector.detectChanges()
  }

  doImportFromFile(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0]
    const reader = new FileReader()
    reader.onload = this.onReaderLoad.bind(this)
    reader.readAsText(file)
  }

  onReaderLoad(event): void {
    this.importQuery = JSON.parse(event.target.result)
  }

  doImport(): void {
    const query = new ApiTranslator().translateImportedSQtoUIQuery(
      QueryProviderService.createDefaultQuery(),
      this.importQuery
    )
    this.dialogRef.close(query)
  }

  doDiscard(): void {
    this.dialogRef.close(this.querySnapshot)
  }

  transform(event): void {
    this.importQuery = JSON.parse(event)
  }
}
