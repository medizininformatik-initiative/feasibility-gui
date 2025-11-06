import { DisplayData } from './DisplayData';
import { FilterTypes } from '../Utilities/FilterTypes';
import { QuantityUnitData } from './Unit';
import { TerminologyCodeData } from './TerminologyCodeData';

export interface ValueDefinitionData {
  display: DisplayData
  type: FilterTypes
  selectableConcepts: TerminologyCodeData[]
  optional: boolean
  allowedUnits: QuantityUnitData[]
  precision: number
  referencedCriteriaSet?: string[]
  referencedValueSet?: string[]
  max: number
  min: number
}
