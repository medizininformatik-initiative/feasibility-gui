import {
  Comparator,
  QuantityUnit,
} from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilter } from './AbstractStructuredQueryFilter';

export class QuantityComparatorFilter extends AbstractStructuredQueryFilter {
  comparator: Comparator = Comparator.NONE;
  max: number = null;
  min: number = null;
  precision: number = null;
  optional = false;
  unit: QuantityUnit = null;
  value: number = null;
}
