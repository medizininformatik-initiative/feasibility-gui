import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToSearchTermResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MatDrawer } from '@angular/material/sidenav';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { Observable, Subscription, of } from 'rxjs';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { SearchTermListEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/SearchTermListEntryAdapter';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToSearchTermResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
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

  selectedDetails$: Observable<SearchTermDetails>;

  constructor(
    private elasticSearchService: ElasticSearchService<SearchTermResultList, SearchTermListEntry>,
    private cdr: ChangeDetectorRef,
    private selectedTableItemsService: SelectedTableItemsService<SearchTermListEntry>
  ) {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = SearchTermListEntryAdapter.adapt(searchTermResults.results);
        }
      });
  }

  ngOnInit() {}

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
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService.startElasticSearch(searchtext).subscribe();
    }
  }

  setSelectedRowItem(item) {
    const selectedIds = this.selectedTableItemsService.getSelectedIds();
    const itemId = item.originalEntry.id;
    if (selectedIds.includes(itemId)) {
      this.selectedTableItemsService.removeFromSelection(item.originalEntry);
    } else {
      this.selectedTableItemsService.setSelectedTableItem(item.originalEntry);
    }
  }

  setClickedRow(row: InterfaceTableDataRow) {
    const originalEntry = row.originalEntry as SearchTermListEntry;
    this.elasticSearchService
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

  public startElasticSearchWithFilter(filter) {}
}
