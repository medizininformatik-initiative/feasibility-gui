import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { map, Observable, of } from 'rxjs';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import { DataQueryApiService } from 'src/app/service/Backend/Api/DataQueryApi.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { CreateCRDTLService } from 'src/app/service/Translator/CRTDL/CreateCRDTL.service';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';

@Component({
  selector: 'num-editor-action-bar',
  templateUrl: './editor-action-bar.component.html',
  styleUrls: ['./editor-action-bar.component.scss'],
})
export class EditorActionBarComponent implements OnInit, OnDestroy {
  stageArray$: Observable<Array<string>> = of([]);
  isFeasibilityQueryValid$: Observable<boolean>;

  constructor(
    private feasibilityQueryValidation: FeasibilityQueryValidation,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService,
    private t: SaveDataQueryModalService
  ) {}

  ngOnInit() {
    this.isFeasibilityQueryValid$ = this.feasibilityQueryValidation.getIsFeasibilityQueryValid();
    this.stageArray$ = this.stageProviderService.getStageUIDArray();
  }

  public saveDataQuery() {
    this.t.openSaveDataQueryModal();
  }

  ngOnDestroy() {}

  public navigateToSearch() {
    this.navigationHelperService.navigateToFeasibilityQuerySearch();
  }

  public doSendRequest(): void {
    this.navigationHelperService.navigateToFeasibilityQueryResult();
  }

  public navigateToDataRequestCohortDefinition(): void {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }

  public saveFeasibilityQuery(): void {
    /*  this.createCRDTLService.createCRDTL().pipe(
      map((crdtl) => {
        this.dataQueryApiService.postDataQuery(crdtl);
      })
    ); */
  }
}
