import { AttributeCode } from './AttributeCode';
import { Display } from './Display';
import { Unit } from './Unit';

export interface AttributeDefinition {
  allowedUnits: Unit[]
  attributeCode: AttributeCode
  display: Display
  optional: boolean
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
  selectableConcepts: string[]
  type: string
}
