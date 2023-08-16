import { V2 } from '../annotations';
import { TerminologyCode, TerminologyEntry } from '../terminology/terminology';
import { ValueFilter } from './valueFilter';
import { TimeRestriction } from './timerestriction';
import { AttributeFilter } from './attributeFilter';
import { CritGroupPosition } from '../../../controller/CritGroupArranger';

// A Criterion is an atomic building block of a query. However, a Criterion itself is defined by
// a terminology code (system + version + code), operators and values.
export class Criterion {
  // termCode?: TerminologyCode
  termCodes?: Array<TerminologyCode> = [];
  display?: string;
  entity?: boolean;
  optional?: boolean;
  valueFilters?: Array<ValueFilter> = [];
  attributeFilters?: Array<AttributeFilter> = [];
  children?: Array<TerminologyEntry> = [];
  isinvalid?: boolean;
  position?: CritGroupPosition;
  linkedCriteria?: Criterion[] = [];
  isLinked?: boolean;
  context?: TerminologyCode;
  criterionHash?: string;

  @V2()
  timeRestriction?: TimeRestriction;
}

export class CriterionOnlyV1 {
  termCode: TerminologyCode;
  context?: TerminologyCode;
  valueFilter?: ValueFilter;
  @V2()
  timeRestriction?: TimeRestriction;
}
export class CriterionOnlyV2 {
  termCodes: Array<TerminologyCode> = [];
  context?: TerminologyCode;
  valueFilter?: ValueFilter;
  attributeFilters?: Array<AttributeFilter> = [];
  timeRestriction?: TimeRestriction;
  isinvalid?: boolean;
}
