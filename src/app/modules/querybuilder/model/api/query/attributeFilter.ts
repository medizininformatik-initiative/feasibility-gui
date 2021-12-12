import { TerminologyCode } from '../terminology/terminology'
import { transient } from '../annotations'
import { AttributeDefinition, ValueDefinition } from '../terminology/valuedefinition'
import { ValueFilter } from './valueFilter'

export class AttributeFilter extends ValueFilter {
  attributeCode: TerminologyCode
}
