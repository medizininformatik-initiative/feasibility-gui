import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CriteriaSearchService } from './SearchTypes/Criteria/CriteriaSearch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { CodeableConceptSearchEngine } from './SearchTypes/CodeableConcept/CodeableConceptSearchEngine';
import { CriteriaSetSearchEngine } from './SearchTypes/CriteriaSet/CriteriaSetSearchEngine';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private criteriaSearchService: CriteriaSearchService) {}

  public searchCriteria(searchText: string): Observable<SearchTermResultList> {
    return this.criteriaSearchService.search(searchText);
  }

  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    const criteriaSetSearch = new CriteriaSetSearchEngine(searchText, criteriaSetUrls);
    return criteriaSetSearch.executeSearch();
  }

  public searchCodeableConcepts(
    searchText: string,
    valueSetUrls: string[]
  ): Observable<CodeableConceptResultList> {
    const codeableConceptSearch = new CodeableConceptSearchEngine(searchText, valueSetUrls);
    return codeableConceptSearch.executeSearch();
  }
}
