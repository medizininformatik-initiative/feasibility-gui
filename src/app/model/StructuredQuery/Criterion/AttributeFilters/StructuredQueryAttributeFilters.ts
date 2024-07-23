import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { FilterTypes } from '../../../Utilities/FilterTypes';
import { AbstractStructuredQuerytAttributeFilters } from './AbstractStructuredQueryAttributeFilters';
import { ConceptAttributeFilter } from './QueryFilters/ConceptFilter/ConceptAttributeFilter';

export class StructuredQueryAttributeFilters extends AbstractStructuredQuerytAttributeFilters {
  attributeCode: TerminologyCode;
  conceptFilter: ConceptAttributeFilter;
  type: FilterTypes;
}
