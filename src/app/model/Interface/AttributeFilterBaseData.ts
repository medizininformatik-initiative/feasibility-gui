import { Comparator } from '../Utilities/Quantity/Comparator';
import { QuantityUnitData } from './Unit';
import { TerminologyCodeData } from './TerminologyCodeData';

export interface AttributeFilterBaseData {
  selectedConcepts: TerminologyCodeData[]
  comparator: Comparator
  minValue?: number
  maxValue?: number
  unit: QuantityUnitData
  value?: number
  precision?: number
}
