import { Component, OnInit } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterionService';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQueryProviderHub } from 'src/app/service/Provider/FeasibilityQueryProviderHub';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { map, Observable } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SelectedTableItemsService } from 'src/app/service/SearchTermListItemService.service';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';

@Component({
  selector: 'num-bulk-search-action-bar',
  templateUrl: './bulk-search-action-bar.component.html',
  styleUrls: ['./bulk-search-action-bar.component.scss'],
})
export class BulkSearchActionBarComponent implements OnInit {
  listItemArray$: Observable<CriteriaListEntry[]>;
  stageArray$: Observable<string[]>;
  isFeasibilityExistent$: Observable<boolean>;

  constructor(
    private listItemSelectionService: SelectedTableItemsService<CriteriaListEntry>,
    private criterionService: CreateCriterionService,
    private stageProviderService: StageProviderService,
    private navigationHelperService: NavigationHelperService,
    private listItemService: SelectedTableItemsService<CriteriaListEntry>,
    private feasibilityQueryProviderHub: FeasibilityQueryProviderHub,
    private feasibilityQueryValidation: FeasibilityQueryValidation,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.listItemArray$ = this.listItemSelectionService.getSelectedTableItems();
    this.stageArray$ = this.stageProviderService.getStageUIDArray();
    this.isFeasibilityExistent$ = this.feasibilityQueryValidation.getIsFeasibilityQuerySet();
  }

  public addItemsToStage() {
    const ids = this.listItemService.getSelectedIds();
    this.criterionService
      .createCriteriaFromHashes(ids)
      .pipe(
        map((criteria: Criterion[]) => {
          this.feasibilityQueryProviderHub.addCriteriaToCriterionProvider(criteria);
          this.feasibilityQueryProviderHub.addCriteriaToStage(criteria);
          return criteria;
        })
      )
      .subscribe((criteria: Criterion[]) => {
        this.snackbarService.displayInfoMessage('FEASIBILITY.SEARCH.SNACKBAR.ADDED_TO_COHORT');
        this.listItemService.clearSelection();
      });
  }

  public navigateToEditor(): void {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
