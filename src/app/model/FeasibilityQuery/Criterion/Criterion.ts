import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { CritGroupPosition } from '../../../modules/querybuilder/controller/CritGroupArranger';
import { TerminologyCode } from '../../terminology/Terminology';
import { TimeRestriction } from '../TimeRestriction';
import { ValueFilter } from './AttributeFilter/ValueFilter';

// A Criterion is an atomic building block of a query. However, a Criterion itself is defined by
// a terminology code (system + version + code), operators and values.
export class Criterion {
  attributeFilters?: Array<AttributeFilter> = [];
  criterionHash?: string;
  context?: TerminologyCode;
  display?: string;
  isInvalid?: boolean = false;
  isLinked?: boolean = false;
  linkedCriteria?: Criterion[] = [];
  optional?: boolean = false;
  position?: CritGroupPosition;
  uniqueID?: string;
  termCodes?: Array<TerminologyCode> = [];
  timeRestriction?: TimeRestriction;
  valueFilters?: Array<ValueFilter> = [];
}
