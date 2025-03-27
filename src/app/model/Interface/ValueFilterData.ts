import { ComparatorTypeData } from './ComparatorTypeData';
import { ValueFilterTypeData } from './ValueFilterTypeData';
import { QuantityUnitData } from './Unit';
import { AttributeFilterBaseData } from './AttributeFilterBaseData';

export interface ValueFilterData extends AttributeFilterBaseData {
  type: ValueFilterTypeData
}
