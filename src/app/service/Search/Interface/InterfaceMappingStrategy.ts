import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

/**
 * Interface defining the contract for mapping raw API responses to typed result objects.
 * Implementations must provide methods for transforming API data into structured
 * search results that can be consumed by the application.
 *
 * @template C - Type extending AbstractListEntry representing individual search result entries
 * @template T - Type extending AbstractResultList representing the complete search result list
 */
export interface MappingStrategy<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  /**
   * Maps a raw API response to a structured result list.
   *
   * @param response - The raw response from the search API
   * @returns A typed result list containing the mapped search results
   */
  mapResponseToResultList(response: any): T

  /**
   * Maps an array of raw result objects to typed list entries.
   *
   * @param results - Array of raw result objects from the API response
   * @returns Array of typed list entries
   */
  mapResponseToEntries(results: any[]): C[]
}
