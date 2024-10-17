import { ActiveFeasibilityQueryService } from '../../../../../service/Provider/ActiveFeasibilityQuery.service';
import { BackendService } from '../../../service/backend.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateCRDTLService } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { of, Subscription, switchMap } from 'rxjs';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';

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
    private createCRDTLService: CreateCRDTLService
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
      }).unsubscribe();
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
