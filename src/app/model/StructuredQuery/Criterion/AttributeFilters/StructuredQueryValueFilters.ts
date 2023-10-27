import { AbstractStructuredQuerytAttributeFilters } from './AbstractStructuredQueryAttributeFilters';
import { ConceptValueFilter } from './QueryFilters/ConceptFilter/ConceptValueFilter';

export class StructuredQueryValueFilters extends AbstractStructuredQuerytAttributeFilters {
  conceptFilter: ConceptValueFilter;
}
