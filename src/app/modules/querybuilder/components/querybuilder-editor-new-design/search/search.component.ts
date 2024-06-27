import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { Subscription } from 'rxjs';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { mapToSearchTermResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { SearchTermListEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/SearchTermListEntryAdapter ';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToSearchTermResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
  ],
})
export class SearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;

  keysToSkip = ['id', 'selectable'];
  listItems: Array<SearchTermListEntry> = [];
  searchtext = '';
  adaptedData: TableData;
  private subscription: Subscription;
  private isInitialized = false;

  constructor(
    private elasticSearchService: ElasticSearchService<SearchTermResultList, SearchTermListEntry>,
    private cdr: ChangeDetectorRef,
    private listItemService: SearchResultListItemSelectionService<SearchTermListEntry>
  ) {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = SearchTermListEntryAdapter.adapt(searchTermResults.results);
        }
      });

    this.listItemService.getSelectedSearchResultListItem().subscribe((row) => {
      if (this.isInitialized) {
        this.cdr.detectChanges();
        if (row) {
          this.openSidenav();
        } else {
          this.closeSidenav();
        }
      }
    });
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
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService.startElasticSearch(searchtext).subscribe();
    }
  }

  openSidenav() {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  public startElasticSearchWithFilter(filter) {}
}
