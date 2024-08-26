import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';

export class QuantityRangeFilter extends AbstractQuantityFilter {
  minValue: number = null;
  maxValue: number = null;
  type: FilterTypes = FilterTypes.QUANTITY_RANGE;
}