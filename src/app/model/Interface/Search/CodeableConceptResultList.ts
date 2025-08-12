import { CodeableConceptResultListEntryData } from './CodeableConceptResultListEntryData';
import { ResultListData } from './ResultListData';

/**
 * Interface representing a complete list of codeable concept search results from backend API responses.
 * Extends base ResultListData with CodeableConceptResultListEntryData entries.
 * Used for mapping JSON responses containing paginated codeable concept search results to domain models.
 */
export type CodeableConceptResultListData = ResultListData<CodeableConceptResultListEntryData>;
