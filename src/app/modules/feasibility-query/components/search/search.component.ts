import { ActiveSearchTermService } from 'src/app/service/Search/ActiveSearchTerm.service';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { CriteriaSearchResultProviderService } from 'src/app/service/Search/SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import {
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  filter,
} from 'rxjs';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { MatDrawer } from '@angular/material/sidenav';
import { PaginatedCriteriaSearchService } from 'src/app/service/Search/Pagination/CriteriaSearchPagination.service';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermDetailsProviderService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetailsProvider.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/SearchTermListEntryAdapter';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';

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

  searchResultsFound = false;

  searchSubscription: Subscription;

  searchWithFilterSubscription: Subscription;

  resetFilterEnabled$: Observable<boolean> = of(true);

  searchButtonEnabled$: Observable<boolean> = of(true);

  page = 0;
  pageSize = 50;

  constructor(
    private activeSearchTermService: ActiveSearchTermService,
    private paginatedCriteriaSearchService: PaginatedCriteriaSearchService,
    public elementRef: ElementRef,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private searchFilterProvider: FilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>,
    private searchTermDetailsService: SearchTermDetailsService,
    private searchResultProviderService: SearchResultProvider,
    private searchTermDetailsProviderService: SearchTermDetailsProviderService
  ) {
    this.subscription = this.searchResultProviderService
      .getCriteriaSearchResults()
      .subscribe((results) => this.handleSearchResults(results?.results || []));
  }

  ngOnInit() {
    this.selectedDetails$ = this.searchTermDetailsProviderService.getSearchTermDetails$();
    this.searchText$ = this.activeSearchTermService.getActiveSearchTerm();
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

  public startElasticSearch() {
    this.searchTextChanged();
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.searchSubscription = this.activeSearchTermService
      .getActiveSearchTerm()
      .pipe(
        switchMap((searchText: string) => this.searchService.searchCriteria(searchText, this.page))
      )
      .subscribe();
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
    this.searchFilters$ = this.searchFilterProvider.getSearchTermFilters().pipe(
      map((searchFilters: SearchTermFilter[]) => searchFilters.map((searchFilter) =>
          CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter)
        ))
    );
  }

  public setElasticSearchFilter(newFilter: SearchFilter) {
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchFilterProvider.updateFilterSelectedValues(
      newFilter.filterType,
      newFilter.selectedValues
    );
    this.startElasticSearch();
  }

  public resetFilter(): void {
    this.activeSearchTermService
      .getActiveSearchTerm()
      .pipe(take(1))
      .subscribe(() => {
        this.searchFilterProvider.resetSelectedValues();
        this.startElasticSearch();
      });
  }

  public searchTextChanged(): void {
    this.searchButtonEnabled$ = this.activeSearchTermService.getActiveSearchTerm().pipe(
      distinctUntilChanged(),
      map((searchText: string) => !(searchText && searchText.length > 2))
    );
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
    this.searchWithFilterSubscription = this.paginatedCriteriaSearchService
      .loadNextPage()
      .subscribe((result: SearchTermResultList) => {
        this.handleSearchResults(result.getResults());
      });
  }
}
