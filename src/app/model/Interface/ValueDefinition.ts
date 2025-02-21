import { FilterTypes } from '../Utilities/FilterTypes';
import { DisplayData } from './DisplayData';
import { Unit } from './Unit';

export interface ValueDefinitionData {
  display: DisplayData
  type: FilterTypes
  selectableConcepts: any[] // Adjust type if needed
  optional: boolean
  allowedUnits: Unit[]
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
  max: number
  min: number
}
