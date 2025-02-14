import { Component, OnInit } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterion.service';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable, of } from 'rxjs';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';

@Component({
  selector: 'num-search-action-bar',
  templateUrl: './search-action-bar.component.html',
  styleUrls: ['./search-action-bar.component.scss'],
})
export class SearchActionBarComponent implements OnInit {
  listItemArray$: Observable<SearchTermListEntry[]> = of([]);
  isFeasibilityExistent$: Observable<boolean>;
  stageArray$: Observable<Array<string>> = of([]);

  constructor(
    private listItemSelectionService: SelectedTableItemsService<SearchTermListEntry>,
    private criterionService: CreateCriterionService,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService,
    private feasibilityQueryValidation: FeasibilityQueryValidation
  ) {}

  ngOnInit() {
    this.listItemArray$ = this.listItemSelectionService.getSelectedTableItems();
    this.stageArray$ = this.stageProviderService.getStageUIDArray();
    this.isFeasibilityExistent$ = this.feasibilityQueryValidation.getIsFeasibilityQuerySet();
  }

  public addItemsToStage() {
    this.criterionService.translateListItemsToCriterions();
  }

  public navigateToEditor() {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
