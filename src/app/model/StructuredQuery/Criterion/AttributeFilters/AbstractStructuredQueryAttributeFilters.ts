import { FilterTypes } from '../../../FilterTypes';
import { AbstractConceptFilter } from './QueryFilters/ConceptFilter/AbstractConceptFilter';
import { QuantityComparatorFilter } from './QueryFilters/QuantityFilter/QuantityComparatorFilter';
import { QuantityRangeFilter } from './QueryFilters/QuantityFilter/QuantityRangeFilter';
import { ReferenceFilter } from './QueryFilters/ReferenceFilter/ReferenceFilter';
import { AtFilter } from './QueryFilters/TimeRestriction/AtFilter';
import { BetweenFilter } from './QueryFilters/TimeRestriction/BetweenFilter';

export abstract class AbstractStructuredQuerytAttributeFilters {
  abstract conceptFilter: AbstractConceptFilter;
  type: FilterTypes;
  quantityRangeFilter: QuantityRangeFilter;
  quantityComparatorFilter: QuantityComparatorFilter;
  referenceFilter: ReferenceFilter;
  timeRestrictionFilter: AtFilter | BetweenFilter;
}
