import { FilterTypes } from '../FilterTypes';
import { TerminologyCode } from '../terminology/Terminology';
import { AbstracStructuredQuerytAttributeFilters } from './AbstractStructuredQueryAttributeFilters';
import { StructuredQueryCriterion } from './Criterion/StructuredQueryCriterion';

export class StructuredQueryAttributeFilters implements AbstracStructuredQuerytAttributeFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  selectedConcepts: TerminologyCode[] = [];
  type: FilterTypes;
}
