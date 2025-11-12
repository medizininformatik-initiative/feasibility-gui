import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CriteriaListEntryAdapter';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaSearchFilter } from 'src/app/model/Search/Filter/CriteriaSearchFilter';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { CriteriaSearchService } from 'src/app/service/Search/SearchTypes/Criteria/CriteriaSearch.service';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SearchTermDetails } from 'src/app/model/Search/SearchDetails/SearchTermDetails';
import { SearchTermDetailsProviderService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetailsProvider.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SelectedTableItemsService } from 'src/app/service/SearchTermListItemService.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { TerminologyApiService } from 'src/app/service/Backend/Api/TerminologyApi.service';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { BulkCriteriaService } from 'src/app/service/Search/SearchTypes/BulkCriteria.service';
import { CriteriaBulkListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CriteriaBulkListEntryAdapter';
import { CriteriaBulkResultList } from 'src/app/model/Search/ResultList/CriteriaBulkResultList';

@Component({
  selector: 'num-feasibility-query-bulk-search',
  templateUrl: './bulk-search.component.html',
  styleUrls: ['./bulk-search.component.scss'],
})
export class FeasibilityQueryBulkSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;
  listItems: Array<CriteriaListEntry> = [];
  adaptedData: TableData;
  private subscription: Subscription;

  private isInitialized = false;

  elasticSearchEnabled = false;

  listIetmDetailsSubscription: Subscription;

  selectedDetails$: Observable<SearchTermDetails>;

  searchFilters$: Observable<SearchFilter[]> = of([]);

  searchText$: Observable<string>;

  searchText = '';

  searchResultsFound = false;

  searchSubscription: Subscription;

  searchWithFilterSubscription: Subscription;

  resetFilterEnabled$: Observable<boolean> = of(true);

  searchButtonEnabled$: Observable<boolean> = of(true);

  constructor(
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private searchFilterProvider: FilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<CriteriaListEntry>,
    private searchTermDetailsService: SearchTermDetailsService,
    private searchTermDetailsProviderService: SearchTermDetailsProviderService,
    private criteriaSearchService: CriteriaSearchService,
    private snackbarService: SnackbarService,
    private bulkCriteriaService: BulkCriteriaService
  ) {}

  ngOnInit() {
    this.selectedDetails$ = this.searchTermDetailsProviderService.getSearchTermDetails$();
    this.searchText$ = this.criteriaSearchService.getActiveSearchTerm();
    this.resetFilterEnabled$ = this.searchFilterProvider.filtersNotSet();
    this.handleSelectedItemsSubscription();
    this.getElasticSearchFilter();
  }

  ngAfterViewInit() {
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.searchWithFilterSubscription?.unsubscribe();
    this.listIetmDetailsSubscription?.unsubscribe();
  }

  public submitComment(form: any) {
    const comment = form.value.searchText;

    const input = '424144002,263495000 ';

    this.bulkCriteriaService
      .search(input)
      .pipe(
        tap((response: CriteriaBulkResultList) =>
          response.getFound().length > 0
            ? (this.searchResultsFound = true)
            : (this.searchResultsFound = false)
        )
      )
      .subscribe((response) => {
        const test = CriteriaBulkListEntryAdapter.adapt(response.getFound());
        this.adaptedData = test;
        console.log(test);
      });
  }

  /** Search Result Handling */
  private handleSearchResults(results: CriteriaListEntry[]): void {
    this.listItems = results;
    this.adaptedData = CriteriaListEntryAdapter.adapt(this.listItems);
    this.searchResultsFound = this.adaptedData.body.rows.length > 0;
    this.selectedTableItemsService
      .getSelectedTableItems()
      .pipe(
        map((selected) => {
          this.adaptedData.body.rows.forEach((row) => {
            row.isCheckboxSelected = selected.some((item) => item.getId() === row.id);
          });
        })
      )
      .subscribe();
  }

  /**
   * If the checked table items get added to stage they will be removed from the SelectedTableItemsService
   * Behaviour Subject Array and therefore an empty Array will be returned. Therefore all checkboxes can be
   * unchecked in the table
   */
  private handleSelectedItemsSubscription(): void {
    this.selectedTableItemsService
      .getSelectedTableItems()
      .subscribe((selectedItems: CriteriaListEntry[]) => {
        if (selectedItems.length === 0) {
          this.uncheckAllRows();
        }
      });
  }

  private uncheckAllRows(): void {
    this.adaptedData?.body.rows.forEach((item) => {
      if (item.isCheckboxSelected) {
        item.isCheckboxSelected = false;
      }
    });
  }

  public startSearch(searchText: string = this.searchText): void {
    this.searchText = searchText;
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.criteriaSearchService.search(searchText).subscribe();
  }

  public setSelectedRowItem(item: InterfaceTableDataRow) {
    const selectedIds = this.selectedTableItemsService.getSelectedIds();
    const itemId = item.originalEntry.getId();
    if (selectedIds.includes(itemId)) {
      this.selectedTableItemsService.removeFromSelection(item.originalEntry as CriteriaListEntry);
      this.snackbarService.displayErrorMessageWithNoCode(
        'FEASIBILITY.SEARCH.SNACKBAR.REMOVED_FROM_STAGE'
      );
    } else {
      this.snackbarService.displayInfoMessage('FEASIBILITY.SEARCH.SNACKBAR.ADDED_TO_STAGE');
      this.selectedTableItemsService.setSelectedTableItem(item.originalEntry as CriteriaListEntry);
    }
  }

  public getElasticSearchFilter(): void {
    this.searchFilters$ = this.searchFilterProvider.getCriteriaSearchFilters().pipe(
      map((filters: CriteriaSearchFilter[]) =>
        filters.filter(
          (searchFilter) =>
            searchFilter.getName() === ElasticSearchFilterTypes.CONTEXT ||
            searchFilter.getName() === ElasticSearchFilterTypes.TERMINOLOGY
        )
      ),
      map((searchFilters: CriteriaSearchFilter[]) =>
        searchFilters.map((searchFilter: CriteriaSearchFilter) =>
          CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter)
        )
      )
    );
  }

  public setElasticSearchFilter(newFilter: SearchFilter) {
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchFilterProvider.updateFilterSelectedValues(
      newFilter.filterType,
      newFilter.selectedValues
    );
  }

  public resetFilter(): void {
    this.searchFilterProvider.resetSelectedValues();
    this.startSearch(this.searchText);
  }
}
