import { Display } from './Display';
import { Unit } from './Unit';

export interface ValueDefinition {
  display: Display
  type: string
  selectableConcepts: any[] // Adjust type if needed
  optional: boolean
  allowedUnits: Unit[]
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
}
