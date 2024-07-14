import { AbstractConceptFilter } from './QueryFilters/ConceptFilter/AbstractConceptFilter';
import { AtFilter } from './QueryFilters/TimeRestriction/AtFilter';
import { BetweenFilter } from './QueryFilters/TimeRestriction/BetweenFilter';
import { FilterTypes } from '../../../FilterTypes';
import { QuantityComparatorFilter } from './QueryFilters/QuantityFilter/QuantityComparatorFilter';
import { QuantityRangeFilter } from './QueryFilters/QuantityFilter/QuantityRangeFilter';
import { ReferenceFilter } from './QueryFilters/ReferenceFilter/ReferenceFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export abstract class AbstractStructuredQuerytAttributeFilters {
  conceptFilter: AbstractConceptFilter;
  quantityComparatorFilter: QuantityComparatorFilter;
  quantityRangeFilter: QuantityRangeFilter;
  referenceFilter: ReferenceFilter;
  timeRestrictionFilter: AtFilter | BetweenFilter;
  type: FilterTypes;
}
