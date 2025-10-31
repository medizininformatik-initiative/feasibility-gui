import { QuantityTypeData } from './QuantityTypeData';
import { QuantityUnitData } from '../Unit';

export interface QuantityRangeFilterData {
  type: QuantityTypeData
  unit: QuantityUnitData
  minValue: number
  maxValue: number
}
