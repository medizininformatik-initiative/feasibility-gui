import { TerminologyCode } from '../Terminology/TerminologyCode';
import { ComparatorTypeData } from './ComparatorTypeData';
import { QuantityUnitData } from './Unit';

export interface AttributeFilterBaseData {
  selectedConcepts: TerminologyCode[]
  comparator: ComparatorTypeData
  minValue?: number
  maxValue?: number
  unit: QuantityUnitData
  value?: number
}
