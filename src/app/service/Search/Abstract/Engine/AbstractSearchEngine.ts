import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { MappingStrategy } from '../../Interface/InterfaceMappingStrategy';
import { Observable } from 'rxjs';
import { SearchEngine } from '../../SearchEngine';

/**
 * @abstract
 * Abstract base class for search engines providing common search functionality.
 * This class follows the Template Method pattern, defining the structure for search operations
 * while allowing concrete implementations to provide specific search logic.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 *
 */
export abstract class AbstractSearchEngine<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  /**
   * Creates an instance of AbstractSearchEngine.
   *
   * @param searchEngine - The underlying search engine service for processing search requests
   * @protected
   * @readonly
   */
  constructor(protected readonly searchEngine: SearchEngine<C, T>) {}

  /**
   * @abstract
   * @protected
   * Creates a search URL based on the provided search parameters.
   * Concrete implementations must provide the specific URL construction logic
   * for their search endpoint.
   *
   * @param searchText - The text to search for
   * @param page - The page number for pagination (0-based)
   * @param dataSetUrls - Optional array of dataset URLs to filter the search
   * @returns The constructed search URL as a string
   */
  protected abstract createUrl(searchText: string, page: number, dataSetUrls?: string[]): string;

  /**
   * @abstract
   * @protected
   * Provides the mapping strategy for transforming raw search results into typed classes.
   * Concrete implementations must return an appropriate MappingStrategy instance
   * that knows how to map the specific result format.
   * @see {MappingStrategy}
   * @returns An instance of MappingStrategy that defines the result mapping logic
   */
  protected abstract getMapping(): MappingStrategy<C, T>;

  /**
   * @abstract
   * @protected
   * Performs the actual search operation with the given parameters.
   * Concrete implementations must provide the complete search logic including
   * URL construction, result mapping, and error handling.
   *
   * @param searchTerm - The search term to query for
   * @param page - Optional page number for pagination (defaults to 0)
   * @param dataSetUrls - Optional array of dataset URLs to filter results
   * @returns An Observable that emits the search results of type T
   */
  protected abstract search(
    searchTerm: string,
    page?: number,
    dataSetUrls?: string[]
  ): Observable<T>;
}
