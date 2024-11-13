import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterion.service';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { FeasibilityQueryProviderService } from '../../../../../service/Provider/FeasibilityQueryProvider.service';

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
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  ngOnInit() {
    this.$listItemArray = this.listItemSelectionService.getSelectedTableItems();
    this.$stageArray = this.stageProviderService.getStageUIDArray();
    this.isFeasibilityExistent = this.queryProviderService.getIsFeasibilityQuerySet();
  }

  public addItemsToStage() {
    this.criterionService.translateListItemsToCriterions();
  }

  public navigateToEditor() {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
