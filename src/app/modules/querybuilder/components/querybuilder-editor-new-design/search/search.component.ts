import { ElasticSearchFilterProvider } from 'src/app/service/Provider/ElasticSearchFilterProvider.service';
import { ElasticSearchFilterService } from 'src/app/service/ElasticSearch/Filter/ElasticSearchFilter.service';
import { ElasticSearchSearchResultProviderService } from 'src/app/service/Provider/ElasticSearchSearchResultProviderService.service';
import { ElasticSearchSearchTermDetailsService } from 'src/app/service/ElasticSearch/ElasticSearchSearchTermDetails.service';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { mapToSearchTermResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MatDrawer } from '@angular/material/sidenav';
import { concatAll, map, mergeMap, Observable, of, Subscription, toArray } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
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
} from '@angular/core';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToSearchTermResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
    { provide: ElasticSearchSearchResultProviderService },
  ],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;

  listItems: Array<SearchTermListEntry> = [];
  searchtext = '';
  adaptedData: TableData;
  private subscription: Subscription;
  private isInitialized = false;
  isOpen = false;

  elasticSearchEnabled = false;

  selectedDetails$: Observable<SearchTermDetails>;

  searchFilters$: Observable<SearchFilter[]>;

  constructor(
    public elementRef: ElementRef,
    private filterService: ElasticSearchFilterService,
    private elasticSearchService: ElasticSearchService<SearchTermResultList, SearchTermListEntry>,
    private cdr: ChangeDetectorRef,
    private elasticSearchFilterProvider: ElasticSearchFilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>,
    private searchTermDetailsService: ElasticSearchSearchTermDetailsService,
    private searchResultProviderService: ElasticSearchSearchResultProviderService<
      SearchTermResultList,
      SearchTermListEntry
    >
  ) {
    this.subscription = this.searchResultProviderService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = SearchTermListEntryAdapter.adapt(searchTermResults.results);
        }
      });
  }

  ngOnInit() {
    this.handleSelectedItemsSubscription();
    this.getElasticSearchFilter();
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
    this.adaptedData.body.rows.forEach((item) => {
      if (item.isCheckboxSelected) {
        this.uncheckRow(item);
      }
    });
  }

  private uncheckRow(item: InterfaceTableDataRow): void {
    item.isCheckboxSelected = false;
  }

  ngAfterViewInit() {
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public startElasticSearch(searchtext: string) {
    this.searchtext = searchtext;
    this.elasticSearchService.startElasticSearch(searchtext).subscribe();
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
      .subscribe((details: SearchTermDetails) => {
        this.selectedDetails$ = of(details);
        this.sidenav.open();
      });
  }

  public setSelectedRelative(entry: SearchTermListEntry) {
    console.log(entry);
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

  public getElasticSearchFilter(): void {
    this.searchFilters$ = this.filterService
      .fetchElasticSearchFilters()
      .pipe(
        map((searchFilters: SearchTermFilter[]) =>
          searchFilters.map((searchFilter) =>
            CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter)
          )
        )
      );

    this.searchFilters$.subscribe((test) => console.log(test));
  }

  public setElasticSearchFilter(filter: any) {
    const newFilter = new SearchTermFilter(filter.type, []);
    newFilter.setSelectedValues(filter.values);
    this.elasticSearchFilterProvider.setFilter(newFilter);
    if (this.searchtext) {
      this.startElasticSearch(this.searchtext);
    }
  }
}
