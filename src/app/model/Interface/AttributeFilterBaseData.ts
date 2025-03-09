import { ComparatorTypeData } from './ComparatorTypeData';
import { QuantityUnitData } from './Unit';

export interface AttributeFilterBaseData {
  comparator: ComparatorTypeData
  minValue?: number
  maxValue?: number
  unit: QuantityUnitData
  value?: number
}
