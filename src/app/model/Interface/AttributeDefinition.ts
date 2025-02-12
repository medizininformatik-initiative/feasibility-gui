import { Display } from './Display';
import { AttributeCode } from './AttributeCode';

export interface AttributeDefinition {
  display: Display
  type: string
  selectableConcepts: any[]
  attributeCode: AttributeCode
  optional: boolean
  allowedUnits: any[]
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
}
