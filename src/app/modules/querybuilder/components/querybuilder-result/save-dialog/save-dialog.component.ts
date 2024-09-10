import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
//import { UIQuery2StructuredQueryTranslatorService } from 'src/app/service/UIQuery2StructuredQueryTranslator.service';

@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveQueryModalComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptionResult: Subscription;
  hasQuerySend: boolean | string;
  querySlotAvailable = false;

  constructor(
    //private UITranslator: UIQuery2StructuredQueryTranslatorService,
    public queryProviderService: FeasibilityQueryProviderService,
    public backend: BackendService,
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>
  ) {}

  query: FeasibilityQuery;
  title = '';
  comment = '';
  filename = '';
  saveWithQuery: boolean | string = false;
  letQuerySave = false;
  saveButtonDisabled = true;
  downloadQuery = false;

  ngOnInit(): void {
    this.queryProviderService.getFeasibilityQueryByID('1');
  }

  ngAfterViewInit() {
    this.isQuerySlotAvailable();
  }

  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe();
  }

  doSave(): void {}

  doDownloadQuery() {
    // const queryString = JSON.stringify(this.UITranslator.translateToStructuredQuery(this.query))
    // const fileData = new Blob([queryString], { type: 'text/plain;charset=utf-8' })
    // this.fileSaverService.save(fileData, this.filename + '.json')
  }

  doDiscard(): void {
    this.dialogRef.close();
  }

  isQuerySlotAvailable(): void {
    this.backend.getSavedQuerySlotCount().subscribe((querySlotCount) => {
      this.querySlotAvailable = querySlotCount.total > querySlotCount.used ? true : false;
    });
  }
}
