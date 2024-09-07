import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbstractSearchEngine } from './Abstract/AbstractSearchEngine';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchEngine } from './SearchTypes/CodeableConcept/CodeableConceptSearchEngine';
import { CriteriaSearchByIdEngine } from './SearchTypes/CriteriaById/CriteriaSearchByIdEngine';
import { CriteriaSearchEngine } from './SearchTypes/Criteria/CriteriaSearchEngine';
import { CriteriaSetSearchEngine } from './SearchTypes/CriteriaSet/CriteriaSetSearchEngine';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';
import { SearchResultSetterService } from './Result/SearchResultSetter.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private terminologyApiService: TerminologyApiService,
    private searchResultSetter: SearchResultSetterService
  ) {}

  public searchCriteria(searchText: string): Observable<SearchTermResultList> {
    const criteriaSearch = new CriteriaSearchEngine(searchText);
    return this.fetchAndProcess<SearchTermResultList>(criteriaSearch).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSearchResults(result); // Set the fetched result
        return result;
      })
    );
  }

  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    const criteriaSetSearch = new CriteriaSetSearchEngine(searchText, criteriaSetUrls);
    return this.fetchAndProcess<ReferenceCriteriaResultList>(criteriaSetSearch).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSetSearchResults(result); // Set the fetched result
        return result;
      })
    );
  }

  public searchCodeableConcepts(
    searchText: string,
    valueSetUrls: string
  ): Observable<CodeableConceptResultList> {
    console.log(valueSetUrls);
    const codeableConceptSearch = new CodeableConceptSearchEngine(searchText, valueSetUrls);
    return this.fetchAndProcess<CodeableConceptResultList>(codeableConceptSearch).pipe(
      map((result) => {
        this.searchResultSetter.setCodeableConceptSearchResults(result); // Set the fetched result
        return result;
      })
    );
  }

  public searchCriteriaById(id: string): Observable<SearchTermResultList> {
    const criteriaSearchById = new CriteriaSearchByIdEngine(id);
    return this.fetchAndProcess<SearchTermResultList>(criteriaSearchById).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSearchResults(result); // Set the fetched result
        return result;
      })
    );
  }

  private fetchAndProcess<T>(searchEngine: AbstractSearchEngine): Observable<T> {
    const url = searchEngine.getUrl();
    return this.terminologyApiService.getElasticSearchResults(url).pipe(
      map((response) => searchEngine.processResponse(response) as T)
    );
  }
}
