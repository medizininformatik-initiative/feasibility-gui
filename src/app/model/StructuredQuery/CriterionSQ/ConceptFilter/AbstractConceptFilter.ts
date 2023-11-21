import { OperatorOptions } from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { TerminologyCode } from '../../../terminology/Terminology';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

export class AbstractConceptFilter extends AbstractStructuredQueryFilters {
  selectedConcepts: TerminologyCode[] = [];
  type: OperatorOptions = OperatorOptions.CONCEPT;
}
