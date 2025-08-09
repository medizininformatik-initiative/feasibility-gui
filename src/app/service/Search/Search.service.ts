import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { CodeableConceptSearchEngineService } from './SearchTypes/CodeableConcept/Engine/CodeableConceptSearchEngine.service';
import { CriteriaSearchMediatorService } from './SearchTypes/Criteria/Mediator/CriteriaSearchMediator.service';
import { CriteriaSearchSigleEntryEngineService } from './SearchTypes/CriteriaById/CriteriaSearchSingleEntryEngine.service';
import { CriteriaSetSearchService } from './SearchTypes/CriteriaSet/CriteriaSetSearch.service';

/**
 * Main search service providing unified access to all search functionality.
 * Acts as a facade for different search types including criteria, criteria sets,
 * codeable concepts, and single criteria searches.
 *
 * @since 1.0.0
 * @author Feasibility GUI Team
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /**
   * Creates an instance of SearchService.
   *
   * @param criteriaSearchService - Service for criteria-based searches
   * @param criteriaSetSearchService - Service for criteria set searches
   * @param codeableConceptSearchService - Service for codeable concept searches
   * @param criteriaSearchSigleEntryEngineService - Service for single criteria searches by ID
   */
  constructor(
    private criteriaSearchService: CriteriaSearchMediatorService,
    private criteriaSetSearchService: CriteriaSetSearchService,
    private codeableConceptSearchService: CodeableConceptSearchEngineService,
    private criteriaSearchSigleEntryEngineService: CriteriaSearchSigleEntryEngineService
  ) {}

  /**
   * Searches for criteria sets using the provided search text and criteria set URLs.
   *
   * @param searchText - The text to search for within criteria sets
   * @param criteriaSetUrls - Array of criteria set URLs to search within
   * @returns An Observable that emits the search results for reference criteria
   */
  public searchCriteriaSets(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    return this.criteriaSetSearchService.search(searchText, criteriaSetUrls);
  }

  // /**
  //  * Searches for codeable concepts using the provided parameters.
  //  * Currently commented out - implementation pending.
  //  *
  //  * @param searchText - The text to search for
  //  * @param valueSetUrl - Array of value set URLs to search within
  //  * @param conceptFilterId - Filter ID for concept filtering
  //  * @param page - Page number for pagination (defaults to 0)
  //  * @returns An Observable that emits the codeable concept search results
  //  */
  // public searchCodeableConcepts(
  //   searchText: string,
  //   valueSetUrl: string[],
  //   conceptFilterId: string,
  //   page: number = 0
  // ): Observable<CodeableConceptResultList> {
  //   return this.codeableConceptSearchService.search(searchText, page, valueSetUrl, conceptFilterId);
  // }

  /**
   * Searches for a specific criteria entry by its unique identifier.
   *
   * @param id - The unique identifier of the criteria to search for
   * @returns An Observable that emits the search term results for the specified criteria
   */
  public searchCriteriaById(id: string): Observable<SearchTermResultList> {
    return this.criteriaSearchSigleEntryEngineService.search(id);
  }
}
