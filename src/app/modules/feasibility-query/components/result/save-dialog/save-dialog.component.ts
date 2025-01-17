import { ActiveFeasibilityQueryService } from '../../../../../service/Provider/ActiveFeasibilityQuery.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateCRDTLService } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryApiService } from 'src/app/service/Backend/Api/FeasibilityQueryApi.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { of, Subscription, switchMap } from 'rxjs';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { SavedFeasibilityQueryResults } from 'src/app/model/Result/SavedFeasibilityQueryResults';

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
    public feasibilityQueryApiService: FeasibilityQueryApiService,
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
        const savedQuery = new SavedFeasibilityQueryResults(
          this.title,
          this.comment,
          result.getTotalNumberOfPatients()
        );
        this.feasibilityQueryApiService
          .postSavedFeasibilityQuery(savedQuery, result.getId())
          .subscribe();
        this.doDiscard();
      })
      .unsubscribe();
  }

  public doSaveDataSelection() {
    this.createCRDTLService.createCRDTL().subscribe().unsubscribe();
  }

  doDiscard(): void {
    this.dialogRef.close();
  }
}
