import { AbstractStructuredQuerytAttributeFilters } from './Criterion/AttributeFilters/AbstractStructuredQueryAttributeFilters';
import { FilterTypes } from '../FilterTypes';
import { StructuredQueryCriterion } from './Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../terminology/Terminology';

export class StructuredQueryAttributeFilters extends AbstractStructuredQuerytAttributeFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  selectedConcepts: TerminologyCode[] = [];
  type: FilterTypes;
}
