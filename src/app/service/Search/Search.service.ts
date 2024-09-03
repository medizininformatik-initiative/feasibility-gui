import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchService } from './CodeableConcept/CodeableConceptSearch.service';
import { CriteriaSearchService } from './Criteria/CriteriaSearch.service';
import { CriteriaSetSearchService } from './CriteriaSet/CriteriaSetSearch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SearchResultProcessorService } from './SearchResultProcessor.service';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptSearch } from './test/CodeableConceptSearch';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private criteriaSearchService: CriteriaSearchService,
    private criteriaSetSearchService: CriteriaSetSearchService,
    private codeableConceptSearchService: CodeableConceptSearchService,
    private test: SearchResultProcessorService<
      CodeableConceptResultListEntry,
      CodeableConceptResultList
    >
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
    //this.test.fetchAndMapSearchResults2(new CodeableConceptSearch(searchText, valueSetUrls)).subscribe((test) => console.log(test))
    return this.codeableConceptSearchService.search(searchText, valueSetUrls);
  }
}
