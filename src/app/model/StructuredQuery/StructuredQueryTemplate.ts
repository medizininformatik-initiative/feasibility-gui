import { TerminologyCode } from '../terminology/Terminology';
import { StructuredQuery } from './StructuredQuery';

export class StructuredQueryTemplate {
  comment: string;
  content: StructuredQuery;
  createdBy: string;
  id: number;
  invalidTerms: TerminologyCode[];
  label: string;
  lastModified: string;
}
