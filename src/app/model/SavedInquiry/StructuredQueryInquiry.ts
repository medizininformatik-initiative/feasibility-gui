import { AbstractInquiry } from './AbstractInquiry';
import { AnnotatedStructuredQuery } from '../result/AnnotatedStructuredQuery/AnnotatedStructuredQuery';

export class StructuredQueryInquiry extends AbstractInquiry {
  createdBy: string;
  content: AnnotatedStructuredQuery;
}
