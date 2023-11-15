import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';
import { TerminologyCode } from '../../terminology/Terminology';
import { TimeRestriction } from '../../FeasibilityQuery/TimeRestriction';

export class CriterionSQ {
  attributeFilters?: Array<AbstractStructuredQueryFilters>;
  context?: TerminologyCode;
  timeRestriction?: TimeRestriction;
  termCodes: Array<TerminologyCode> = [];
  valueFilter?: AbstractStructuredQueryFilters;
}
