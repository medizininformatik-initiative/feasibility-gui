import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractSearchResultProviderService } from './Result/AbstractSearchResultProvider.servcie';
import { Observable } from 'rxjs';

/**
 * @abstract
 * Base abstract class for all search functionality in the application.
 * Defines the core contract for search operations including searching, pagination,
 * and result management.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
export abstract class AbstractSearch<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  /**
   * Creates an instance of AbstractSearch.
   *
   * @param resultProviderService - The result provider service for managing search results
   * @protected
   */
  constructor(protected resultProviderService: AbstractSearchResultProviderService<C, T>) {}

  /**
   * @abstract
   * Performs a search operation with the given search term.
   *
   * @param searchTerm - The term to search for
   * @param dataSetUrls - Optional array of dataset URLs to filter the search
   * @returns An Observable that emits the search results
   */
  abstract search(searchTerm: string, dataSetUrls?: string[]): Observable<T>;

  /**
   * @abstract
   * Loads the next page of results for a previously executed search.
   *
   * @param searchTerm - The original search term
   * @param dataSetUrls - Array of dataset URLs used in the search
   * @returns An Observable that emits the next page of search results
   */
  public abstract loadNextPage(searchTerm: string, dataSetUrls: string[]): Observable<T>;

  /**
   * @abstract
   * Retrieves the current search results without performing a new search.
   *
   * @param dataSetUrls - Optional array of dataset URLs to filter results
   * @returns An Observable that emits the current search results
   */
  public abstract getSearchResults(dataSetUrls?: string[]): Observable<T>;

  /**
   * @abstract
   * @protected
   * Sets the current search term for internal state management.
   *
   * @param searchTerm - The search term to set
   */
  protected abstract setSearchTerm(searchTerm: string): void;
}
