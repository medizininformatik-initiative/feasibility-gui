import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { QuantityComparisonOption } from 'src/app/model/QuantityFilterOptions';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: QuantityComparisonOption = QuantityComparisonOption.NONE;
  type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  value: number = null;
}
