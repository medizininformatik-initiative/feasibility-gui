import { SearchResult } from './SearchResult';
import { TermCode } from './TermCode';

export interface CodeableConceptResult extends SearchResult {
  termCode: TermCode
}
