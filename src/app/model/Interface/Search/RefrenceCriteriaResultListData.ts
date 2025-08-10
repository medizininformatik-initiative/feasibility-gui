import { ReferenceCriteriaListEntryData } from './ReferenceCriteriaListEntryData';
import { ResultListData } from './ResultListData';

/**
 * Interface representing a complete list of reference criteria search results from backend API responses.
 * Extends base ResultListData with ReferenceCriteriaListEntryData entries and explicit property definitions.
 * Used for mapping JSON responses containing paginated reference criteria search results to domain models.
 */
export interface ReferenceCriteriaResultListData
  extends ResultListData<ReferenceCriteriaListEntryData> {
  /**
   * Total number of hits for the search term across all pages
   */
  totalHits: number

  /**
   * Array of reference criteria entries for the current page
   */
  results: Array<ReferenceCriteriaListEntryData>
}
