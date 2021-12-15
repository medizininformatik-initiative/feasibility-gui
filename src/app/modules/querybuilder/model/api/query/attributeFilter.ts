import { TerminologyCode } from '../terminology/terminology'
import { ValueFilter } from './valueFilter'

export class AttributeFilter extends ValueFilter {
  attributeCode: TerminologyCode
}
