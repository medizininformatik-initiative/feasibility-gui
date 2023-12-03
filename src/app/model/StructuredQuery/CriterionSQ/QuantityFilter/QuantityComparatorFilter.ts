import { FilterTypes } from 'src/app/model/FilterTypes';
import {
  Comparator,
  OperatorOptions,
} from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: Comparator = Comparator.NONE;
  type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  value: number = null;
}
