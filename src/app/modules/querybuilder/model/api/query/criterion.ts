import { transient, V2 } from '../annotations'
import { TerminologyCode, TerminologyEntry } from '../terminology/terminology'
import { ValueFilter } from './valueFilter'
import { TimeRestriction } from './timerestriction'

// A Criterion is an atomic building block of a query. However, a Criterion itself is defined by
// a terminology code (system + version + code), operators and values.
export class Criterion {
  termCode: TerminologyCode

  @transient()
  termEntry?: TerminologyEntry

  valueFilter?: ValueFilter
  @V2()
  timeRestriction?: TimeRestriction
}
