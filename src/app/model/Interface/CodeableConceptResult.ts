import { SearchResult } from './SearchResult';
import { TerminologyCodeData } from './TerminologyCodeData ';

export interface CodeableConceptResult extends SearchResult {
  termCode: TerminologyCodeData
}
