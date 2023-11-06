import { Criterion } from '../../FeasibilityQuery/Criterion/Criterion';
import { TimeRestriction } from '../../FeasibilityQuery/TimeRestriction';
import { TerminologyCode, TerminologyEntry } from '../../terminology/Terminology';
import { AbstractStructuredQueryFilter } from './AbstractStructuredQueryFilter';

export class CriterionSQ {
  attributeFilters?: Array<AbstractStructuredQueryFilter>;
  context?: TerminologyCode;
  children?: Array<TerminologyEntry>;
  linkedCriteria?: Criterion[];
  timeRestriction?: TimeRestriction;
  termCodes: Array<TerminologyCode> = [];
  valueFilter?: AbstractStructuredQueryFilter;
}
