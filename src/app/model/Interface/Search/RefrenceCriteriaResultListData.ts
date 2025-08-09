import { ReferenceCriteriaListEntryData } from './ReferenceCriteriaListEntryData';
import { ResultListData } from './ResultListData';

export interface ReferenceCriteriaResultListData
  extends ResultListData<ReferenceCriteriaListEntryData> {
  /**
   * Total number of hits for the search term.
   */
  totalHits: number

  /**
   * Array of reference criteria entries.
   */
  results: Array<ReferenceCriteriaListEntryData>
}
