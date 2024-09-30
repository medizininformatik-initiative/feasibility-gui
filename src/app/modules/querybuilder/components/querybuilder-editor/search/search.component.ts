import { map, Observable, of, Subscription } from 'rxjs';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { ElasticSearchFilterService } from 'src/app/service/ElasticSearch/Filter/ElasticSearchFilter.service';
import { ElasticSearchSearchTermDetailsService } from 'src/app/service/ElasticSearch/ElasticSearchSearchTermDetails.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchFilter } from 'src/app/shared/models/SearchFilter/InterfaceSearchFilter';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/SearchTermListEntryAdapter';
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
import { FilterProvider } from 'src/app/service/Search/Filter/SearchFilterProvider.service';
import { TableRowDetailsService } from 'src/app/shared/service/Table/TableRowDetails.service';
import {SearchFilterService} from "../../../../../service/Search/Filter/SearchFilter.service";

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
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

  constructor(
    public elementRef: ElementRef,
    private filterService: SearchFilterService,
    private elasticSearchService: SearchService,
    private cdr: ChangeDetectorRef,
    private elasticSearchFilterProvider: FilterProvider,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>,
    private searchTermDetailsService: TableRowDetailsService,
    private searchResultProviderService: SearchResultProvider
  ) {
    this.subscription = this.searchResultProviderService
      .getCriteriaSearchResults()
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

  ngAfterViewInit() {
    this.isInitialized = true;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public startElasticSearch(searchtext: string) {
    this.searchtext = searchtext;
    this.elasticSearchService.searchCriteria(searchtext).subscribe();
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
      .fetchFilters()
      .pipe(
        map((searchFilters: SearchTermFilter[]) =>
          searchFilters.map((searchFilter) =>
            CriteriaSearchFilterAdapter.convertToFilterValues(searchFilter)
          )
        )
      );
  }

  public setElasticSearchFilter(filter: any) {
    const newFilter = new SearchTermFilter(filter.type, []);
    newFilter.setSelectedValues(filter.values);
    this.elasticSearchFilterProvider.setFilter(newFilter);
    if (this.searchtext) {
      this.startElasticSearch(this.searchtext);
    }
  }

  resetFilter(): void {
    this.elasticSearchFilterProvider.resetSelectedValuesOfType();
    this.rerender();
  }
}
