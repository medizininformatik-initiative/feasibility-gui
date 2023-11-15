import { AbstractStructuredQueryFilters } from './AbstractStructuredQueryFilters';
import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
} from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';

export class QuantityComparatorFilter extends AbstractStructuredQueryFilters {
  comparator: Comparator = Comparator.NONE;
  unit: QuantityUnit = null;
  type: OperatorOptions = OperatorOptions.QUANTITY_COMPARATOR;
  value: number = null;
}
