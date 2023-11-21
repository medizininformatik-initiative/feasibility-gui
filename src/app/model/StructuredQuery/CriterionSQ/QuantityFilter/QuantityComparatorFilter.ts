import {
  Comparator,
  OperatorOptions,
} from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';

export class QuantityComparatorFilter extends AbstractQuantityFilter {
  comparator: Comparator = Comparator.NONE;
  type: OperatorOptions = OperatorOptions.QUANTITY_COMPARATOR;
  value: number = null;
}
