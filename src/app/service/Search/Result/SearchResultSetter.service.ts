import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchResultProviderService } from '../SearchTypes/CodeableConcept/Result/CodeableConceptSearchResultProvider.service';
import { CriteriaSearchResultProviderService } from '../SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { CriteriaSetSearchResultProviderService } from '../SearchTypes/CriteriaSet/Result/CriteriaSetSearchResultProvider.service ';

@Injectable({
  providedIn: 'root',
})
export class SearchResultSetterService {
  constructor(
    private criteriaResultProvider: CriteriaSearchResultProviderService,
    private criteriaSetResultProvider: CriteriaSetSearchResultProviderService,
    private codeableConceptResultProvider: CodeableConceptSearchResultProviderService
  ) {}

  /**
   * Sets the criteria search results.
   *
   * @param result The SearchTermResultList to set.
   */
  public setCriteriaSearchResults(result: SearchTermResultList): void {
    this.criteriaResultProvider.setSearchResults(result);
  }
}
