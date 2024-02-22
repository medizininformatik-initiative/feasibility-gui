import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { Comparator } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';

export class QuantityRangeFilter extends AbstractQuantityFilter {
  minValue: number = null;
  maxValue: number = null;
  type: FilterTypes = FilterTypes.QUANTITY_RANGE;
}
