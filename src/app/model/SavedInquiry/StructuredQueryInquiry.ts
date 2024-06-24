import { AnnotatedStructuredQuery } from '../Result/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { AbstractInquiry } from './AbstractInquiry';

export class StructuredQueryInquiry extends AbstractInquiry {
  createdBy: string;
  content: AnnotatedStructuredQuery;
}
