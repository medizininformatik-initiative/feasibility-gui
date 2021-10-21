import { V2 } from '../annotations'
import { TerminologyCode, TerminologyEntry } from '../terminology/terminology'
import { ValueFilter } from './valueFilter'
import { TimeRestriction } from './timerestriction'

// A Criterion is an atomic building block of a query. However, a Criterion itself is defined by
// a terminology code (system + version + code), operators and values.
export class Criterion {
  // termCode?: TerminologyCode
  termCodes?: Array<TerminologyCode> = []
  display: string

  valueFilters: Array<ValueFilter> = []
  attributeFilters?: Array<ValueFilter> = []
  children?: Array<TerminologyEntry> = []

  @V2()
  timeRestriction?: TimeRestriction
}

export class CriterionOnlyV1 {
  termCode: TerminologyCode

  valueFilter?: ValueFilter
  @V2()
  timeRestriction?: TimeRestriction
}
export class CriterionOnlyV2 {
  termCodes: Array<TerminologyCode> = []

  valueFilter?: ValueFilter
  attributeFilters?: ValueFilter
  timeRestriction?: TimeRestriction
}
