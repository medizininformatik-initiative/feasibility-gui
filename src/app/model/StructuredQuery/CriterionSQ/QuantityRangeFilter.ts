import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
} from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';

export class QuantityRangeFilter extends AbstractStructuredQueryFilters {
  minValue: number = null;
  maxValue: number = null;
  type: OperatorOptions = OperatorOptions.QUANTITY_RANGE;
  unit: QuantityUnit = null;
}
