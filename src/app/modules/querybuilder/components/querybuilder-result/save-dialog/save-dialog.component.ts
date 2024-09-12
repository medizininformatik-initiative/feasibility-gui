import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultProviderService } from 'src/app/service/Provider/ResultProvider.service';
import { Subscription, switchMap, of } from 'rxjs';
import { UIQuery2StructuredQueryService } from 'src/app/service/Translator/StructureQuery/UIQuery2StructuredQuery.service';
import {ActiveFeasibilityQueryService} from "../../../../../service/Provider/ActiveFeasibilityQuery.service";
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
    private resultProvider: ResultProviderService,
    private activeFeasibilityQuery: ActiveFeasibilityQueryService
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
    let translatedQuery: string;
    this.activeFeasibilityQuery.getActiveFeasibilityQueryIDObservable()
      .pipe(
      switchMap((id) => this.feasibilityQueryProviderService.getFeasibilityQueryByID(id)),
      switchMap((feasibilityQuery: FeasibilityQuery) => {
        console.log(feasibilityQuery)
        translatedQuery =  JSON.stringify(this.sqTranslatorService.translateToStructuredQuery(feasibilityQuery));
        console.log(translatedQuery)
        console.log(feasibilityQuery.getResultIds())
        console.log(feasibilityQuery.getResultIds()[feasibilityQuery.getResultIds().length - 1])
        console.log(this.resultProvider.getResultByID(feasibilityQuery.getResultIds()[feasibilityQuery.getResultIds().length - 1]))
        return of(this.resultProvider.getResultByID(feasibilityQuery.getResultIds()[feasibilityQuery.getResultIds().length - 1]));

      })).subscribe((result) => {

console.log(result)
        // feasibilityQuery.
        // this.resultProvider.getResultByID()
        // this.backendService.saveQuery()
      });


  }
  doDiscard(): void {
    this.dialogRef.close();
  }
}
