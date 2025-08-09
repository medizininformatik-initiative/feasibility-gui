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
import { MatDrawer } from '@angular/material/sidenav';
import { map, Observable, of, Subscription } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { ActiveSearchTermService } from 'src/app/service/Search/ActiveSearchTerm.service';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermDetailsProviderService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetailsProvider.service';
import { CriteriaSearchService } from 'src/app/service/Search/SearchTypes/Criteria/CriteriaSearch.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SearchTermListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/SearchTermListEntryAdapter';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';

@Component({
  selector: 'num-feasibility-query-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class FeasibilityQuerySearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;
  listItems: Array<SearchTermListEntry> = [];
  searchtext = '';
  adaptedData: TableData;
  private subscription: Subscription;
  isOpen = false;

  private isInitialized = false;

  elasticSearchEnabled = false;

  selectedDetails$: Observable<SearchTermDetails>;

  searchFilters$: Observable<SearchFilter[]> = of([]);

  searchText$: Observable<string>;

  searchText = '';

  searchResultsFound = false;

  searchSubscription: Subscription;

  searchWithFilterSubscription: Subscription;

  resetFilterEnabled$: Observable<boolean> = of(true);

  searchButtonEnabled$: Observable<boolean> = of(true);

  page = 0;
  pageSize = 50;

  constructor(
    private activeSearchTermService: ActiveSearchTermService,
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private searchFilterProvider: FilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>,
    private searchTermDetailsService: SearchTermDetailsService,
    private searchTermDetailsProviderService: SearchTermDetailsProviderService,
    private criteriaSearchService: CriteriaSearchService
  ) {
    this.subscription = this.criteriaSearchService
      .getSearchResults()
      .subscribe((results) => this.handleSearchResults(results?.results || []));
  }

  ngOnInit() {
    this.selectedDetails$ = this.searchTermDetailsProviderService.getSearchTermDetails$();
    this.searchText$ = this.activeSearchTermService.getActiveCriteriaSearchTerm();
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
  }

  /** Search Result Handling */
  private handleSearchResults(results: SearchTermListEntry[]): void {
    this.listItems = results;
    this.adaptedData = SearchTermListEntryAdapter.adapt(this.listItems);
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
      .subscribe((selectedItems: SearchTermListEntry[]) => {
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
    const itemId = item.originalEntry.id;
    if (selectedIds.includes(itemId)) {
      this.selectedTableItemsService.removeFromSelection(item.originalEntry as SearchTermListEntry);
    } else {
      this.selectedTableItemsService.setSelectedTableItem(item.originalEntry as SearchTermListEntry);
    }
  }

  public setClickedRow(row: InterfaceTableDataRow) {
    const originalEntry = row.originalEntry as SearchTermListEntry;
    this.searchTermDetailsService
      .getDetailsForListItem(originalEntry.id)
      .subscribe(() => this.openSidenav());
  }

  public getElasticSearchFilter(): void {
    this.searchFilters$ = this.searchFilterProvider
      .getSearchTermFilters()
      .pipe(
        map((searchFilters: SearchTermFilter[]) =>
          searchFilters.map((searchFilter) =>
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
    this.startSearch(this.searchText);
  }

  public resetFilter(): void {
    this.searchFilterProvider.resetSelectedValues();
    this.startSearch(this.searchText);
  }

  openSidenav() {
    if (this.sidenav) {
      this.isOpen = true;
      this.sidenav.open();
    }
  }

  closeSidenav() {
    if (this.sidenav) {
      this.isOpen = false;
      this.sidenav.close();
    }
  }

  public loadMoreCriteriaSearchResults() {
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchWithFilterSubscription = this.criteriaSearchService
      .loadNextPage(this.searchText)
      .subscribe((result: SearchTermResultList) => {
        this.handleSearchResults(result.getResults());
      });
  }
}
