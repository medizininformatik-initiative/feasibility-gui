import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { Comparator } from 'src/app/model/Comparator';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: Comparator = Comparator.NONE;
  type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  value: number = null;
}
