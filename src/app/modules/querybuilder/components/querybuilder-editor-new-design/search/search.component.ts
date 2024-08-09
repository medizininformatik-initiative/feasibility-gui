import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { mapToSearchTermResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, of, Subscription } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
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
    public elementRef: ElementRef,
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
