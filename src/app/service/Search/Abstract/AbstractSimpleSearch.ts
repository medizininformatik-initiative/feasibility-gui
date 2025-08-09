import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractSearch } from './AbstractSearch';
import { Observable } from 'rxjs';
import { AbstractSimpleSearchResultProvider } from './Result/AbstractSimpleSearchResultProvider.service';

/**
 * @abstract
 * Abstract class for simple search functionality without dataset filtering.
 * Extends AbstractSearch to provide straightforward search operations that operate
 * on a single search context without key-based filtering or multiple dataset support.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
export abstract class AbstractSimpleSearch<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> extends AbstractSearch<C, T> {
  /**
   * Creates an instance of AbstractSimpleSearch.
   *
   * @param resultProviderService - The simple result provider service for managing search results
   * @protected
   */
  constructor(protected resultProviderService: AbstractSimpleSearchResultProvider<C, T>) {
    super(resultProviderService);
  }

  /**
   * @abstract
   * Performs a simple search operation with the given search term.
   *
   * @param searchTerm - The term to search for
   * @returns An Observable that emits the search results
   */
  abstract search(searchTerm: string): Observable<T>;

  /**
   * @abstract
   * Loads the next page of results for a previously executed simple search.
   *
   * @param searchTerm - The original search term
   * @returns An Observable that emits the next page of search results
   */
  abstract loadNextPage(searchTerm: string): Observable<T>;

  /**
   * Retrieves the current search results without performing a new search.
   *
   * @returns An Observable that emits the current search results
   */
  public getSearchResults(): Observable<T> {
    return this.resultProviderService.getSearchResults();
  }

  /**
   * @abstract
   * @protected
   * Sets the current search term for internal state management.
   *
   * @param searchTerm - The search term to set
   */
  protected abstract setSearchTerm(searchTerm: string): void;
}
