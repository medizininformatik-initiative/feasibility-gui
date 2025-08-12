import { SearchResultData } from './SearchResultData';

/**
 * Interface representing the top-level search response structure from backend API.
 * Contains search results and metadata for generic search operations.
 * Used for mapping JSON responses from search endpoints to domain models.
 */
export interface SearchResponse {
  /**
   * Array of individual search result entries
   */
  results: SearchResultData[]

  /**
   * Total number of search hits across all pages
   */
  totalHits: number
}
