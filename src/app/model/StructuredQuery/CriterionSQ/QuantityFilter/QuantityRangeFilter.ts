import { OperatorOptions } from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';

export class QuantityRangeFilter extends AbstractQuantityFilter {
  minValue: number = null;
  maxValue: number = null;
  type: OperatorOptions = OperatorOptions.QUANTITY_RANGE;
}
