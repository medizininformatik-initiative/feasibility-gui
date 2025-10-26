import { QuantityTypeData } from './QuantityTypeData';
import { QuantityUnitData } from '../Unit';

export interface QuantityComparatorFilterData {
  type: QuantityTypeData
  unit: QuantityUnitData
  value: number
}
