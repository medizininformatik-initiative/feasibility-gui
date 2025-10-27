import { DisplayData } from '../DisplayData';

/**
 * Interface representing individual search result data from backend API responses.
 * Provides basic structure for search results with identification and display information.
 * Used for mapping JSON responses to generic search result domain models.
 */
export interface SearchResultData {
  /**
   * Unique identifier for the search result entry
   */
  id: string

  /**
   * Display information including original text and translations
   */
  display: DisplayData
}
