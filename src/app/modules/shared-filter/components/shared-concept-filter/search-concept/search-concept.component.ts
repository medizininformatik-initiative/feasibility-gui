import { SearchService } from 'src/app/service/Search/Search.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-search-concept',
  templateUrl: './search-concept.component.html',
  styleUrls: ['./search-concept.component.scss'],
})
export class SearchConceptComponent implements OnDestroy, OnInit {
  @Input()
  valueSetUrl: string;

  @Input()
  conceptFilterId: string;

  private searchSubscription: Subscription;
  public searchResults: CodeableConceptResultList;

  constructor(private conceptFilterSearchService: SearchService) {}

  ngOnInit(): void {
    this.startElasticSearch('');
  }
  /**
   * Initiates a search and handles the results.
   *
   * @param searchtext The text to search for.
   */
  public startElasticSearch(searchtext: string): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = this.conceptFilterSearchService
      .searchCodeableConcepts(searchtext, this.valueSetUrl, this.conceptFilterId)
      .subscribe(
        (result) => {
          this.searchResults = result;
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
