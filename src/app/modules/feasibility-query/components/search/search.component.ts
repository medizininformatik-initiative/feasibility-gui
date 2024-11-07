import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
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
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { map, Observable, Subscription, switchMap, take } from 'rxjs';
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
  private isInitialized = false;
  isOpen = false;

  elasticSearchEnabled = false;

  selectedDetails$: Observable<SearchTermDetails>;

  searchFilters$: Observable<SearchFilter[]>;

  searchText$: Observable<string>;

  searchResultsFound = false;

  searchSubscription: Subscription;

  searchWithFilterSubscription: Subscription;

  constructor(
    public elementRef: ElementRef,
    private filterService: SearchFilterService,
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
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = SearchTermListEntryAdapter.adapt(searchTermResults.results);
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
    this.selectedDetails$ = this.searchTermDetailsProviderService.getSearchTermDetails$();
    this.handleSelectedItemsSubscription();
    this.getElasticSearchFilter();
    this.searchText$ = this.searchService.getActiveCriteriaSearchTerm();
    this.searchSubscription = this.searchService
      .getActiveCriteriaSearchTerm()
      .pipe(
        switchMap((searchText) => {
          this.searchtext = searchText;
          return this.searchService.searchCriteria(searchText || '');
        })
      )
      .subscribe();
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
    this.searchService.setActiveCriteriaSearchTerm(searchtext);
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
    this.searchFilters$ = this.filterService.fetchFilters().pipe(
      map((searchFilters: SearchTermFilter[]) =>
        searchFilters.map((searchFilter) => {
          searchFilter.setSelectedValues(
            this.searchFilterProvider.getSelectedValuesOfType(searchFilter.getName())
          );
          return CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter);
        })
      )
    );
  }

  public setElasticSearchFilter(filter: any) {
    this.searchWithFilterSubscription?.unsubscribe();
    const newFilter = new SearchTermFilter(filter.type, []);
    newFilter.setSelectedValues(filter.values);
    this.searchFilterProvider.setFilter(newFilter);
    this.searchService.searchCriteria(this.searchtext).subscribe();
  }

  public resetFilter(): void {
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
}
