import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';
import { TerminologyCode } from '../../terminology/Terminology';
import { TimeRestriction } from '../../FeasibilityQuery/TimeRestriction';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';

/**
 * @todo we need default values for all class attributes
 */
export class StructuredQueryCriterion {
  attributeFilters?: Array<AbstractStructuredQueryFilters>;
  context?: TerminologyCode;
  timeRestriction?: AbstractTimeRestriction;
  termCodes: Array<TerminologyCode> = [];
  valueFilter?: AbstractStructuredQueryFilters;
}
