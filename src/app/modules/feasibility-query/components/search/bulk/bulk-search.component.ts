import { BulkCriteriaSearchFilterService } from 'src/app/service/Search/Filter/BulkCriteriaSearchFilter.service';
import { BulkCriteriaSearchProvider } from 'src/app/service/Search/SearchTypes/BulkCriteria/BulkCriteriaSearchTextProvider.service';
import { BulkCriteriaService } from 'src/app/service/Search/SearchTypes/BulkCriteria/BulkCriteria.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CriteriaBulkEntry } from 'src/app/model/Search/ListEntries/CriteriaBulkEntry';
import { CriteriaBulkListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CriteriaBulkListEntryAdapter';
import { CriteriaBulkResultList } from 'src/app/model/Search/ResultList/CriteriaBulkResultList';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SelectedBulkCriteriaService } from 'src/app/service/SelectedBulkCriteria.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';

/**
 * Component for bulk criteria search functionality.
 * Allows users to search for multiple criteria at once and manage selected entries.
 */
@Component({
  selector: 'num-feasibility-query-bulk-search',
  templateUrl: './bulk-search.component.html',
  styleUrls: ['./bulk-search.component.scss'],
})
export class FeasibilityQueryBulkSearchComponent implements OnInit, OnDestroy {
  foundCriteriaTableData: TableData;
  notFoundCriteriaTableData: TableData;
  searchFilters$: Observable<SearchFilter[]> = of([]);
  searchResultsFound = false;
  bulkSearchTermInput: string;
  filterMap: Map<string, string[]> = new Map<string, string[]>();
  filterAreSet = false;
  foundCount: number;
  notFoundCount: number;

  private subscriptions = new Subscription();
  private isInitialized = false;

  constructor(
    private bulkCriteriaSearchProvider: BulkCriteriaSearchProvider,
    private bulkCriteriaSearchFilterService: BulkCriteriaSearchFilterService,
    private searchFilterProvider: FilterProvider,
    private bulkCriteriaService: BulkCriteriaService,
    private selectedBulkCriteriaService: SelectedBulkCriteriaService
  ) {
    this.getBulkCriteriaSearchFilter();
  }

  ngOnInit(): void {
    this.initializeSelectedEntriesSubscription();
    this.getBulkCriteriaSearchFilter();
    this.bulkSearchTermInput = this.bulkCriteriaSearchProvider.getSearchText();
    if (this.shouldAutoSubmitSearch()) {
      this.submitSearch();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Submits the bulk search with the current search term input.
   */
  public submitSearch(): void {
    this.bulkCriteriaSearchProvider.setSearchText(this.bulkSearchTermInput);
    const searchSub = this.bulkCriteriaService
      .search(this.bulkSearchTermInput)
      .pipe(
        tap((response: CriteriaBulkResultList) => {
          this.searchResultsFound = response.getFound().length > 0;
          this.foundCount = response.getFound().length;
          this.notFoundCount = response.getNotFound().length;
        })
      )
      .subscribe((response: CriteriaBulkResultList) => {
        this.handleSearchResults(response);
      });

    this.subscriptions.add(searchSub);
  }

  /**
   * Sets the selected row item in the bulk criteria selection.
   * @param item - The table data row that was selected
   */
  public setSelectedRowItem(item: InterfaceTableDataRow): void {
    const criteriaBulkEntry = item.originalEntry as CriteriaBulkEntry;
    this.selectedBulkCriteriaService.addSelectedBulkCriterion(criteriaBulkEntry);
  }

  /**
   * Retrieves and sets up the bulk criteria search filters.
   */
  public getBulkCriteriaSearchFilter(): void {
    this.searchFilters$ = this.bulkCriteriaSearchFilterService.getFilter().pipe(
      tap((searchFilters: SearchFilter[]) => this.populateFilterMap(searchFilters)),
      tap(() => this.updateFilterStatus())
    );
  }

  /**
   * Updates the elastic search filter with new values.
   * @param newFilter - The new search filter to apply
   */
  public setElasticSearchFilter(newFilter: SearchFilter): void {
    this.filterMap.set(newFilter.filterType, newFilter.selectedValues as string[]);
    this.updateFilterStatus();
    const selectedValues = Array.isArray(newFilter.selectedValues)
      ? newFilter.selectedValues
      : [newFilter.selectedValues];

    this.searchFilterProvider.updateFilterSelectedValues(newFilter.filterType, selectedValues);
  }

  /**
   * Initializes the subscription for selected entries updates.
   */
  private initializeSelectedEntriesSubscription(): void {
    const selectedSub = this.selectedBulkCriteriaService
      .getFoundEntries()
      .pipe(
        map((entries: CriteriaBulkEntry[]) => {
          this.updateRowSelectionStatus(entries);
        })
      )
      .subscribe();

    this.subscriptions.add(selectedSub);
  }

  /**
   * Determines if the search should be auto-submitted on initialization.
   * @returns True if search should be submitted automatically
   */
  private shouldAutoSubmitSearch(): boolean {
    return !!(
      this.bulkSearchTermInput &&
      this.bulkSearchTermInput.length > 0 &&
      this.filterMap.size > 1
    );
  }

  /**
   * Handles the search results by updating selected criteria and adapted data.
   * @param response - The bulk criteria result list from the search
   */
  private handleSearchResults(response: CriteriaBulkResultList): void {
    this.selectedBulkCriteriaService.addSelectedBulkCriteriaIds(response.getFound());
    this.selectedBulkCriteriaService.setUiProfileId(response.getUiProfileId());
    this.foundCriteriaTableData = CriteriaBulkListEntryAdapter.adaptFound(response.getFound());
    this.notFoundCriteriaTableData = CriteriaBulkListEntryAdapter.adaptNotFound(
      response.getNotFound()
    );
  }

  /**
   * Updates the checkbox selection status for table rows based on selected entries.
   * @param entries - Array of selected criteria bulk entries
   */
  private updateRowSelectionStatus(entries: CriteriaBulkEntry[]): void {
    if (!this.foundCriteriaTableData?.body?.rows) {
      return;
    }
    this.foundCriteriaTableData.body.rows.forEach((row) => {
      row.isCheckboxSelected = entries.some((item) => item.getId() === row.id);
    });
  }

  /**
   * Populates the filter map from search filters.
   * @param searchFilters - Array of search filters
   */
  private populateFilterMap(searchFilters: SearchFilter[]): void {
    searchFilters.forEach((filter) => {
      this.filterMap.set(filter.filterType, filter.selectedValues as string[]);
    });
  }

  /**
   * Updates the filter status based on whether all filters have selected values.
   */
  private updateFilterStatus(): void {
    const filterArray = Array.from(this.filterMap);
    this.filterAreSet = filterArray.every(([key, values]) => values.length > 0);
  }
}
