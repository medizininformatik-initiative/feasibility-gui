import { TimeRestriction } from '../../FeasibilityQuery/TimeRestriction';
import { TerminologyCode } from '../../terminology/Terminology';
import { AbstractStructuredQueryFilters } from './AttributeFilters/QueryFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from './AttributeFilters/QueryFilters/TimeRestriction/AbstractTimeRestriction';

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
