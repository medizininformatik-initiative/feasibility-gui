import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, of } from 'rxjs';
import { StageProviderService } from '../../../../../service/Provider/StageProvider.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeasibilityQueryResultService } from 'src/app/service/FeasibilityQuery/Result/FeasibilityQueryResult.service';

@Component({
  selector: 'num-editor-action-bar',
  templateUrl: './editor-action-bar.component.html',
  styleUrls: ['./editor-action-bar.component.scss'],
})
export class EditorActionBarComponent implements OnInit, OnDestroy {
  $stageArray: Observable<Array<string>> = of([]);
  isFeasibilityQueryValid: Observable<boolean>;

  constructor(
    private queryProviderService: FeasibilityQueryProviderService,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit() {
    this.isFeasibilityQueryValid = this.queryProviderService.getIsFeasibilityQueryValid();
    this.$stageArray = this.stageProviderService.getStageUIDArray();
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
}
