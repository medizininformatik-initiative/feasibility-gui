import { FilterTypes } from '../../../FilterTypes';
import { TerminologyCode } from '../../../terminology/Terminology';
import { AbstractStructuredQuerytAttributeFilters } from './AbstractStructuredQueryAttributeFilters';
import { AbstractStructuredQueryFilters } from './QueryFilters/AbstractStructuredQueryFilters';
import { ConceptAttributeFilter } from './QueryFilters/ConceptFilter/ConceptAttributeFilter';

export class StructuredQueryAttributeFilters extends AbstractStructuredQuerytAttributeFilters {
  attributeCode: TerminologyCode;
  conceptFilter: ConceptAttributeFilter;
  type: FilterTypes;
}
