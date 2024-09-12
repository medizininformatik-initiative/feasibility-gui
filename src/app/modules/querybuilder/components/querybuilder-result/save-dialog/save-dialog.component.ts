import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { Subscription } from 'rxjs';
import { UIQuery2StructuredQueryService } from 'src/app/service/Translator/StructureQuery/UIQuery2StructuredQuery.service';
//import { UIQuery2StructuredQueryTranslatorService } from 'src/app/service/UIQuery2StructuredQueryTranslator.service';

@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveQueryModalComponent implements OnInit, OnDestroy {
  private subscriptionResult: Subscription;
  hasQuerySend: boolean | string;

  constructor(
    public feasibilityQueryProviderService: FeasibilityQueryProviderService,
    public backendService: BackendService,
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>,
    private sqTranslatorService: UIQuery2StructuredQueryService,
    private resultProvider: ResultProviderService
  ) {}

  query: FeasibilityQuery;
  title = '';
  comment = '';
  filename = '';
  saveWithQuery: boolean | string = false;
  letQuerySave = false;
  saveButtonDisabled = true;
  downloadQuery = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe();
  }

  doSave(): void {
    this.feasibilityQueryProviderService
      .getFeasibilityQueryByID('1')
      .subscribe((feasibilityQuery) => {
        const queryString = JSON.stringify(
          this.sqTranslatorService.translateToStructuredQuery(feasibilityQuery)
        );
        // feasibilityQuery.
        // this.resultProvider.getResultByID()
        // this.backendService.saveQuery()
      });
  }

  doDiscard(): void {
    this.dialogRef.close();
  }
}
