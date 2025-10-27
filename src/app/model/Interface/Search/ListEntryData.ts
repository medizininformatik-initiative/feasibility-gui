/**
 * Base interface for list entry data received from backend API responses.
 * Provides the minimal contract for all searchable list items with unique identification.
 * Used as foundation for mapping backend JSON responses to frontend models.
 */
export interface ListEntryData {
  /**
   * Unique identifier for the list entry
   */
  id: string
}
