import { TerminologyCode } from '../terminology/terminology'
import { transient } from '../annotations'
import { AttributeDefinition, ValueDefinition } from '../terminology/valuedefinition'

export class ValueFilter {
  type: OperatorOptions

  @transient()
  valueDefinition?: ValueDefinition

  @transient()
  attributeDefinition?: AttributeDefinition

  @transient()
  display?: string

  // QUANTITY_COMPARATOR & QUANTITY_RANGE
  unit?: QuantityUnit
  @transient()
  precision?: number
  @transient()
  min?: number
  @transient()
  max?: number

  // QUANTITY_COMPARATOR
  value?: number
  comparator?: Comparator

  // QUANTITY_RANGE
  minValue?: number
  maxValue?: number

  // CONCEPT
  selectedConcepts?: TerminologyCode[] = []
}

export class QuantityUnit {
  // UCUM
  code: string
  display: string
}

export enum Comparator {
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  LESS_OR_EQUAL = 'le',
  LESS_THAN = 'lt',
  GREATER_OR_EQUAL = 'ge',
  GREATER_THAN = 'gt',
}

export enum OperatorOptions {
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
}
