import { ListEntryData } from './ListEntryData';

/**
 * Generic interface representing paginated search result lists from backend API responses.
 * Provides structure for search results including total count and result entries.
 * Used as base for mapping JSON responses to domain result list models.
 *
 * @template T - Type of list entry data extending ListEntryData
 */
export interface ResultListData<T extends ListEntryData> {
  /**
   * Total number of hits/results available across all pages
   */
  totalHits: number

  /**
   * Array of result entries for the current page
   */
  results: T[]
}
