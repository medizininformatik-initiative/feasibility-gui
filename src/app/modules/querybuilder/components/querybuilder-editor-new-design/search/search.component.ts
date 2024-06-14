import { Component, OnDestroy } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  keysToSkip = ['id', 'selectable'];
  listItems: Array<SearchTermListEntry> = [];
  searchtext = '';
  private subscription: Subscription;

  constructor(private elasticSearchService: ElasticSearchService) {
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
      this.elasticSearchService.startElasticSearch(searchtext).subscribe();
    }
  }

  public startElasticSearchWithFilter(filter) {
    console.log(filter);
  }
}
