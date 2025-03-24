import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataQueryValidationService } from 'src/app/service/DataQuery/DataQueryValidation.service';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { Observable, of } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';

@Component({
  selector: 'num-editor-action-bar',
  templateUrl: './editor-action-bar.component.html',
  styleUrls: ['./editor-action-bar.component.scss'],
})
export class EditorActionBarComponent implements OnInit, OnDestroy {
  stageArray$: Observable<Array<string>> = of([]);
  isFeasibilityQueryValid$: Observable<boolean>;

  validDataQuery$: Observable<{
    feasibilityQuery: boolean
    dataSelection: boolean
  }>;

  constructor(
    private dataQueryValidation: DataQueryValidationService,
    private feasibilityQueryValidation: FeasibilityQueryValidation,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService,
    private saveDataQueryModalService: SaveDataQueryModalService
  ) {}

  ngOnInit() {
    this.isFeasibilityQueryValid$ = this.feasibilityQueryValidation.getIsFeasibilityQueryValid();
    this.stageArray$ = this.stageProviderService.getStageUIDArray();
    this.validDataQuery$ = this.dataQueryValidation.validateDataQuery();
  }

  ngOnDestroy() {}

  public saveDataQuery() {
    this.saveDataQueryModalService.openSaveDataQueryModal();
  }

  public navigateToSearch() {
    this.navigationHelperService.navigateToFeasibilityQuerySearch();
  }

  public doSendRequest(): void {
    this.navigationHelperService.navigateToFeasibilityQueryResult();
  }

  public navigateToDataRequestCohortDefinition(): void {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
