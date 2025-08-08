import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { CodeableConceptSearchEngineService } from './SearchTypes/CodeableConcept/Engine/CodeableConceptSearchEngine.service';
import { CriteriaSearchMediatorService } from './SearchTypes/Criteria/Mediator/CriteriaSearchMediator.service';
import { CriteriaSearchSigleEntryEngineService } from './SearchTypes/CriteriaById/CriteriaSearchSingleEntryEngine.service';
import { CriteriaSetSearchEngineService } from './SearchTypes/CriteriaSet/CriteriaSetSearchEngine';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private criteriaSearchService: CriteriaSearchMediatorService,
    private criteriaSetSearchService: CriteriaSetSearchEngineService,
    private codeableConceptSearchService: CodeableConceptSearchEngineService,
    private criteriaSearchSigleEntryEngineService: CriteriaSearchSigleEntryEngineService
  ) {}

  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string
  ): Observable<ReferenceCriteriaResultList> {
    return this.criteriaSetSearchService.search(searchText, criteriaSetUrls);
  }

  // public searchCodeableConcepts(
  //   searchText: string,
  //   valueSetUrl: string[],
  //   conceptFilterId: string,
  //   page: number = 0
  // ): Observable<CodeableConceptResultList> {
  //   return this.codeableConceptSearchService.search(searchText, page, valueSetUrl, conceptFilterId);
  // }

  public searchCriteriaById(id: string): Observable<SearchTermResultList> {
    return this.criteriaSearchSigleEntryEngineService.search(id);
  }
}
