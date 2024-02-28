import { StructuredQuery } from '../StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../terminology/Terminology';

export class FeasibilityQueryTemplate {
  comment: string;
  content: StructuredQuery;
  createdBy: string;
  id: number;
  invalidTerms: TerminologyCode[];
  label: string;
  lastModified: string;
  isValid = true;
}
