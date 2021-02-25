import { TerminologyCode } from './terminology'
import { QuantityUnit } from '../query/valueFilter'

export abstract class ValueDefinition {
  type: ValueType

  display?: string

  precision = 1
  max?: number
  min?: number
  allowedUnits?: QuantityUnit[] = []

  selectableConcepts?: TerminologyCode[]
}

export enum ValueType {
  QUANTITY = 'quantity',
  CONCEPT = 'concept',
}
