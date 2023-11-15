import { OperatorOptions } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { TerminologyCode } from '../../terminology/Terminology';
import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';

export class ConceptFilter extends AbstractStructuredQueryFilters {
  selectedConcepts: TerminologyCode[] = [];
  type: OperatorOptions = OperatorOptions.CONCEPT;
}
