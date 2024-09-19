import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { Subscription, switchMap, of } from 'rxjs';
import { UIQuery2StructuredQueryService } from 'src/app/service/Translator/StructureQuery/UIQuery2StructuredQuery.service';
import { ActiveFeasibilityQueryService } from '../../../../../service/Provider/ActiveFeasibilityQuery.service';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { CreateCRDTL } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
//import { UIQuery2StructuredQueryTranslatorService } from 'src/app/service/UIQuery2StructuredQueryTranslator.service';

@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveQueryModalComponent implements OnInit, OnDestroy {
  private subscriptionResult: Subscription;
  hasQuerySend: boolean | string;

  query: FeasibilityQuery;
  title = '';
  comment = '';
  filename = '';
  saveWithQuery: boolean | string = false;
  letQuerySave = false;
  saveButtonDisabled = true;
  downloadQuery = false;

  constructor(
    public feasibilityQueryProviderService: FeasibilityQueryProviderService,
    public backendService: BackendService,
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>,
    private resultProvider: ResultProviderService,
    private activeFeasibilityQuery: ActiveFeasibilityQueryService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private dataSelectionProvider: DataSelectionProviderService,
    private createCRDTLService: CreateCRDTL
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe();
  }

  doSaveFeasibilityQuery(): void {
    this.activeFeasibilityQuery
      .getActiveFeasibilityQueryIDObservable()
      .pipe(
        switchMap((id) => this.feasibilityQueryProviderService.getFeasibilityQueryByID(id)),
        switchMap((feasibilityQuery: FeasibilityQuery) => {
          const resultIds: string[] = feasibilityQuery.getResultIds();
          return of(this.resultProvider.getResultByID(resultIds[resultIds.length - 1]));
        })
      )
      .subscribe((result) => {
        this.backendService
          .saveQuery(result, this.title, this.comment)
          .subscribe((test) => console.log(test));
        this.doDiscard();
      });
  }

  public doSaveDataSelection() {
    this.createCRDTLService
      .createCRDTL()
      .subscribe((crdtl: CRTDL) => {
        /**
         * Send the crdtl to the backend
         */
      })
      .unsubscribe();
  }

  doDiscard(): void {
    this.dialogRef.close();
  }
}
