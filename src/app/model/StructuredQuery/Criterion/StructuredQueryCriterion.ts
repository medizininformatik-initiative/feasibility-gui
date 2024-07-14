import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { AbstractStructuredQueryFilters } from './AttributeFilters/QueryFilters/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from './AttributeFilters/QueryFilters/TimeRestriction/AbstractTimeRestriction';

/**
 * @todo we need default values for all class attributes
 */
export class StructuredQueryCriterion {
  termCodes: Array<TerminologyCode> = [];
  attributeFilters?: Array<AbstractStructuredQueryFilters>;
  context?: TerminologyCode;
  timeRestriction?: AbstractTimeRestriction;
  valueFilter?: AbstractStructuredQueryFilters;
}
