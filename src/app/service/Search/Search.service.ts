import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchService } from './CodeableConcept/CodeableConceptSearch.service';
import { CriteriaSearchService } from './Criteria/CriteriaSearch.service';
import { CriteriaSetSearchService } from './CriteriaSet/CriteriaSetSearch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private criteriaSearchService: CriteriaSearchService,
    private criteriaSetSearchService: CriteriaSetSearchService,
    private codeableConceptSearchService: CodeableConceptSearchService
  ) {}

  public searchCriteria(searchText: string): Observable<SearchTermResultList> {
    return this.criteriaSearchService.search(searchText);
  }

  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    return this.criteriaSetSearchService.search(searchText, criteriaSetUrls);
  }

  public searchCodeableConcepts(
    searchText: string,
    valueSetUrls: string[]
  ): Observable<CodeableConceptResultList> {
    return this.codeableConceptSearchService.search(searchText, valueSetUrls);
  }
}
