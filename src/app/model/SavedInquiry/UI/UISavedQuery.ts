import { AbstractInquiry } from '../AbstractInquiry';
import { StructuredQuery } from '../../StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../../terminology/Terminology';

export class UISavedQuery extends AbstractInquiry {
  isValid = true;
  totalNumberOfPatients: number;
}
