import { ReferenceCriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/ReferenceCriteriaResultList';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { CriteriaSetSearchMediatorService } from './Mediator/CriteriaSetSearchMediator.service';
import { CriteriaSetSearchPaginationService } from './Pagination/CriteriaSetSearchPagination.service';
import { CriteriaSetSearchResultProviderService } from './Result/CriteriaSetSearchResultProvider.service ';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractKeyedSearch } from '../../Abstract/AbstractKeyedSearch';

/**
 * Service for performing criteria set searches with criteria set filtering.
 * Extends AbstractKeyedSearch to provide specific functionality for searching
 * reference criteria within specified criteria sets with pagination support.
 *
 * @since 1.0.0
 * @author Feasibility GUI Team
 */
@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchService extends AbstractKeyedSearch<
  ReferenceCriteriaListEntry,
  ReferenceCriteriaResultList
> {
  /**
   * Creates an instance of CriteriaSetSearchService.
   *
   * @param resultProvider - The result provider for managing criteria set search results
   * @param paginationService - The pagination service for handling paginated searches
   */
  constructor(
    resultProvider: CriteriaSetSearchResultProviderService,
    private paginationService: CriteriaSetSearchPaginationService
  ) {
    super(resultProvider);
  }

  /**
   * Performs a new criteria set search within the specified criteria sets.
   *
   * @param searchText - The text to search for within criteria sets
   * @param criteriaSetUrls - Array of criteria set URLs to search within
   * @returns An Observable that emits the first page of criteria set search results
   */
  public search(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    return this.paginationService.searchFirstPageOfCriteriaSet(searchText, criteriaSetUrls);
  }

  /**
   * Loads the next page of results for a previously executed criteria set search.
   *
   * @param searchText - The original search text
   * @param criteriaSetUrls - Array of criteria set URLs used in the original search
   * @returns An Observable that emits the next page of criteria set search results
   */
  public loadNextPage(
    searchText: string,
    criteriaSetUrls: string[]
  ): Observable<ReferenceCriteriaResultList> {
    return this.paginationService.loadNextPageOfCriteriaSetResults(searchText, criteriaSetUrls);
  }

  /**
   * @protected
   * Sets the current search term for internal state management.
   * Currently a placeholder implementation - extend as needed for specific requirements.
   *
   * @param searchTerm - The search term to set
   */
  protected setSearchTerm(searchTerm: string): void {
    // Implement logic to set the search term if needed
  }
}
