import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { OperatorOptions } from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { StructuredQueryCriterion } from '../StructuredQueryCriterion';
import { TerminologyCode } from '../../../terminology/Terminology';

export class ReferenceFilter extends AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  type: OperatorOptions = OperatorOptions.REFERENCE;
}
