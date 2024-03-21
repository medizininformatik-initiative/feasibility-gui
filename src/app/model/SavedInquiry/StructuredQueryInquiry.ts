import { AbstractInquiry } from './AbstractInquiry';
import { StructuredQuery } from '../StructuredQuery/StructuredQuery';

export class StructuredQueryInquiry extends AbstractInquiry {
  createdBy: string;
  content: StructuredQuery;
}
