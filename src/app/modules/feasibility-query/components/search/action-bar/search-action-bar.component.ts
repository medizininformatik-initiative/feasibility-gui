import { Component, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQueryProviderHub } from 'src/app/service/Provider/FeasibilityQueryProviderHub';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';
import { map, Observable, of } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterionService';

@Component({
  selector: 'num-search-action-bar',
  templateUrl: './search-action-bar.component.html',
  styleUrls: ['./search-action-bar.component.scss'],
})
export class SearchActionBarComponent implements OnInit {
  $listItemArray: Observable<SearchTermListEntry[]> = of([]);
  isFeasibilityExistent: Observable<boolean>;
  $stageArray: Observable<Array<string>> = of([]);

  constructor(
    private listItemSelectionService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionService: CreateCriterionService,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService,
    private queryProviderService: FeasibilityQueryProviderService,
    private listItemService: SelectedTableItemsService<SearchTermListEntry>,
    private feasibilityQueryProviderHub: FeasibilityQueryProviderHub
  ) {}

  ngOnInit() {
    this.$listItemArray = this.listItemSelectionService.getSelectedTableItems();
    this.$stageArray = this.stageProviderService.getStageUIDArray();
    this.isFeasibilityExistent = this.queryProviderService.getIsFeasibilityQuerySet();
  }

  public addItemsToStage() {
    const ids = this.listItemService.getSelectedIds();
    this.criterionService
      .createCriteriaFromHashes(ids)
      .pipe(
        map((criteria: Criterion[]) => {
          this.feasibilityQueryProviderHub.addCriteriaToCriterionProvider(criteria);
          this.feasibilityQueryProviderHub.addCriteriaToStage(criteria);
        })
      )
      .subscribe(() => this.listItemService.clearSelection());
  }

  public navigateToEditor() {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
