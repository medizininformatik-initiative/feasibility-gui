import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchEngineService } from './SearchTypes/CodeableConcept/CodeableConceptSearchEngine.service';
import { CriteriaSearchEngineService } from './SearchTypes/Criteria/CriteriaSearchEngine';
import { CriteriaSearchSigleEntryEngineService } from './SearchTypes/CriteriaById/CriteriaSearchSingleEntryEngine.service';
import { CriteriaSetSearchEngineService } from './SearchTypes/CriteriaSet/CriteriaSetSearchEngine';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private activeSearchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private criteriaSearchService: CriteriaSearchEngineService,
    private criteriaSetSearchService: CriteriaSetSearchEngineService,
    private codeableConceptSearchService: CodeableConceptSearchEngineService,
    private criteriaSearchSigleEntryEngineService: CriteriaSearchSigleEntryEngineService
  ) {}

  public getActiveSearchTerm(): Observable<string> {
    return this.activeSearchTermSubject.asObservable();
  }

  public setActiveSearchTerm(newSearchTerm: string): void {
    this.activeSearchTermSubject.next(newSearchTerm);
  }

  public searchCriteria(searchText: string): Observable<SearchTermResultList> {
    this.setActiveSearchTerm(searchText);
    return this.criteriaSearchService.search(searchText);
  }

  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string
  ): Observable<ReferenceCriteriaResultList> {
    return this.criteriaSetSearchService.search(searchText, criteriaSetUrls);
  }

  public searchCodeableConcepts(
    searchText: string,
    valueSetUrl: string,
    attributeCodeCode: string
  ): Observable<CodeableConceptResultList> {
    return this.codeableConceptSearchService.search(searchText, valueSetUrl, attributeCodeCode);
  }

  public searchCriteriaById(id: string): Observable<SearchTermResultList> {
    return this.criteriaSearchSigleEntryEngineService.search(id);
  }
}
