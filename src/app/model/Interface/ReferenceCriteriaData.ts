import { ContextData } from './ContextData';
import { TerminologyCodeData } from './TerminologyCodeData';

export interface ReferenceCriteriaData {
  readonly termCodes: TerminologyCodeData[]
  readonly context: ContextData
}
