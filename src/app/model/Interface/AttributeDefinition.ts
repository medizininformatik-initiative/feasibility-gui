import { AttributeCode } from './AttributeCode';
import { DisplayData } from './DisplayData';
import { Unit } from './Unit';

export interface AttributeDefinition {
  allowedUnits: Unit[]
  attributeCode: AttributeCode
  display: DisplayData
  optional: boolean
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
  selectableConcepts: string[]
  type: string
}
