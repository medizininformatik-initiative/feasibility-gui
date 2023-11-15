import { OperatorOptions } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { TerminologyCode } from '../../terminology/Terminology';
import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';
import { CriterionSQ } from './CriterionSQ';

export class ReferenceFilter extends AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  criteria: CriterionSQ[] = [];
  type: OperatorOptions = OperatorOptions.REFERENCE;
}
