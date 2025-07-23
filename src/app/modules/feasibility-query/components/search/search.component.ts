import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchFilterService } from 'src/app/service/Search/Filter/SearchFilter.service';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermDetailsProviderService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetailsProvider.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/SearchTermListEntryAdapter';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { map, Observable, Subscription, take } from 'rxjs';
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
import { ActivatedRoute } from '@angular/router';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { CriteriaSearchResultProviderService } from 'src/app/service/Search/SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';

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

  searchFilters: SearchFilter[] = [];

  searchText$: Observable<string>;

  searchResultsFound = false;

  searchSubscription: Subscription;

  searchWithFilterSubscription: Subscription;

  infiniteScrollEnabled = false;

  page = 0;
  pageSize = 50;

  constructor(
    public elementRef: ElementRef,
    private filterService: SearchFilterService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private searchFilterProvider: FilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>,
    private searchTermDetailsService: SearchTermDetailsService,
    private searchResultProviderService: SearchResultProvider,
    private searchTermDetailsProviderService: SearchTermDetailsProviderService,
    private activatedRoute: ActivatedRoute,
    private criteriaResultProvider: CriteriaSearchResultProviderService
  ) {
    this.subscription = this.searchResultProviderService
      .getCriteriaSearchResults()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.infiniteScrollEnabled = false;
          this.adaptedData = SearchTermListEntryAdapter.adapt(this.listItems);
          if (this.adaptedData.body.rows.length > 0) {
            this.searchResultsFound = true;
          } else {
            this.searchResultsFound = false;
          }
          this.selectedTableItemsService
            .getSelectedTableItems()
            .pipe(
              map((tableItems) => {
                this.adaptedData.body.rows.forEach((row) => {
                  const found = tableItems.find((item) => item.getId() === row.id);
                  if (found) {
                    row.isCheckboxSelected = true;
                  }
                });
              })
            )
            .subscribe();
        }
      });
  }

  ngOnInit() {
    const t = this.activatedRoute.snapshot.data.preLoadCriteriaData;
    this.selectedDetails$ = this.searchTermDetailsProviderService.getSearchTermDetails$();
    this.handleSelectedItemsSubscription();
    this.getElasticSearchFilter();
    this.searchText$ = this.searchService.getActiveCriteriaSearchTerm();
    this.criteriaResultProvider.clearResults();
  }

  ngAfterViewInit() {
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchWithFilterSubscription?.unsubscribe();
  }

  public rerender() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
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
        if (this.shouldUncheckAll(selectedItems)) {
          this.uncheckAllRows();
        }
      });
  }

  private shouldUncheckAll(selectedItems: SearchTermListEntry[]): boolean {
    return selectedItems.length === 0;
  }

  private uncheckAllRows(): void {
    this.adaptedData?.body.rows.forEach((item) => {
      if (item.isCheckboxSelected) {
        this.uncheckRow(item);
      }
    });
  }

  private uncheckRow(item: InterfaceTableDataRow): void {
    item.isCheckboxSelected = false;
  }

  public startElasticSearch(searchtext: string) {
    this.page = 0;
    this.criteriaResultProvider.clearResults();
    this.searchService.searchCriteria(searchtext).subscribe();
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
    const searchFilters: Array<SearchTermFilter> =
      this.activatedRoute.snapshot.data.preLoadCriteriaFilter;
    if (searchFilters && searchFilters.length > 0) {
      this.searchFilters = searchFilters.map((searchFilter: SearchTermFilter) => {
        searchFilter.setSelectedValues(
          this.searchFilterProvider.getSelectedValuesOfType(searchFilter.getName())
        );
        return CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter);
      });
    }
  }

  public setElasticSearchFilter(filter: any) {
    this.page = 0;
    this.searchWithFilterSubscription?.unsubscribe();
    const newFilter = new SearchTermFilter(filter.type, []);
    newFilter.setSelectedValues(filter.values);
    this.searchFilterProvider.setFilter(newFilter);
    this.criteriaResultProvider.clearResults();
    this.searchService.searchCriteria(this.searchtext).subscribe();
  }

  public resetFilter(): void {
    this.page = 0;
    this.criteriaResultProvider.clearResults();
    this.searchText$.pipe(take(1)).subscribe((searchText: string) => {
      this.searchFilterProvider.resetSelectedValuesOfType();
      this.searchService.searchCriteria(searchText).subscribe({
        next: () => {
          this.rerender();
        },
        error: (err) => console.error('Search failed', err),
      });
    });
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
    console.log('Loading more criteria search results...');
    this.page++;
    this.infiniteScrollEnabled = true;
    this.searchWithFilterSubscription?.unsubscribe();
    this.searchWithFilterSubscription = this.searchService
      .searchCriteria(this.searchtext, this.page)
      .subscribe();
  }
}
