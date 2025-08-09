import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchResultProviderService } from '../SearchTypes/CodeableConcept/Result/CodeableConceptSearchResultProvider.service';
import { CriteriaSearchResultProviderService } from '../SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
/**
 * @deprecated
 */
export class SearchResultProvider {
  constructor(private criteriaResultProvider: CriteriaSearchResultProviderService) {}

  public getCriteriaSearchResults(): Observable<SearchTermResultList | null> {
    return this.criteriaResultProvider.getSearchResults();
  }
}
