import { AbstractInquiry } from '../AbstractInquiry';
import { StructuredQuery } from '../../StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../../terminology/Terminology';

export class UITemplate extends AbstractInquiry {
  createdBy: string;
  isValid = true;
}
