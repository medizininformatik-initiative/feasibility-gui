import { Comparator } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: Comparator = Comparator.NONE;
  type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  value: number = null;
}
