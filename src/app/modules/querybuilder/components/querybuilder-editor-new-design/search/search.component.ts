import { Component, OnDestroy } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { Subscription } from 'rxjs';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import {
  mapToSearchTermListEntry,
  mapToSearchTermResultList,
} from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToSearchTermResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
  ],
})
export class SearchComponent implements OnDestroy {
  keysToSkip = ['id', 'selectable'];
  listItems: Array<SearchTermListEntry> = [];
  searchtext = '';
  private subscription: Subscription;

  constructor(private elasticSearchService: ElasticSearchService<SearchTermListEntry>) {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        this.listItems = searchTermResults;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService.startElasticSearchNew(searchtext).subscribe();
    }
  }

  public startElasticSearchWithFilter(filter) {}
}
