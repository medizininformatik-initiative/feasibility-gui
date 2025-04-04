import { DisplayData } from './DisplayData';
import { FilterTypes } from '../Utilities/FilterTypes';
import { QuantityUnitData } from './Unit';

export interface ValueDefinitionData {
  display: DisplayData
  type: FilterTypes
  selectableConcepts: any[]
  optional: boolean
  allowedUnits: QuantityUnitData[]
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
  max: number
  min: number
}
