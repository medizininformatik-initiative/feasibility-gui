import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

/**
 * @abstract
 * Abstract base class for mapping raw search responses to typed result objects.
 * Defines the contract for transforming API responses into structured search results
 * that can be consumed by the application.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
export abstract class AbstractResultMapper<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  /**
   * @abstract
   * Maps a raw API response to a structured result list.
   *
   * @param response - The raw response from the search API
   * @returns A typed result list containing the mapped search results
   */
  abstract mapResponseToResultList(response: any): T;

  /**
   * @abstract
   * Maps an array of raw result objects to typed list entries.
   *
   * @param results - Array of raw result objects from the API response
   * @returns Array of typed list entries
   */
  abstract mapResponseToEntries(results: any[]): C[];
}
