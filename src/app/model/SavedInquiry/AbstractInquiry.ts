import { StructuredQuery } from '../StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../terminology/Terminology';

export abstract class AbstractInquiry {
  comment: string;
  content: StructuredQuery;
  id: number;
  invalidTerms: TerminologyCode[];
  label: string;
  lastModified: string;
}
