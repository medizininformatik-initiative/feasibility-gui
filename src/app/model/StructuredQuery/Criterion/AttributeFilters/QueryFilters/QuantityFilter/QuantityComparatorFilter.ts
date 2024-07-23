import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: QuantityComparisonOption = QuantityComparisonOption.NONE;
  type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  value: number = null;
}
