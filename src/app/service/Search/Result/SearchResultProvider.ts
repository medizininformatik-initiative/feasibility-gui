import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchResultProviderService } from '../SearchTypes/CodeableConcept/Result/CodeableConceptSearchResultProvider.service';
import { CriteriaSearchResultProviderService } from '../SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { CriteriaSetSearchResultProviderService } from '../SearchTypes/CriteriaSet/Result/CriteriaSetSearchResultProvider.service ';

@Injectable({
  providedIn: 'root',
})
export class SearchResultProvider {
  constructor(
    private criteriaResultProvider: CriteriaSearchResultProviderService,
    private criteriaSetResultProvider: CriteriaSetSearchResultProviderService,
    private codeableConceptResultProvider: CodeableConceptSearchResultProviderService
  ) {}

  public getCriteriaSearchResults(): Observable<SearchTermResultList | null> {
    return this.criteriaResultProvider.getSearchResults();
  }

  public getCriteriaSetSearchResults(): Observable<ReferenceCriteriaResultList | null> {
    return this.criteriaSetResultProvider.getSearchResults();
  }

  public getCodeableConceptSearchResults(
    valueSetUrl: string
  ): Observable<CodeableConceptResultList | null> {
    return this.codeableConceptResultProvider.getSearchResults(valueSetUrl);
  }
}
