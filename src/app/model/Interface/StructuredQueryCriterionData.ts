import { ContextData } from './ContextData';
import { TimeRestrictionData } from './TimeRestrictionData';
import { ValueFilterData } from './ValueFilterData';
import { TerminologyCodeData } from './TerminologyCodeData ';
import { AttributeFilterData } from './ AttributeFilterData';

export interface StructuredQueryCriterionData {
  attributeFilters?: AttributeFilterData[]
  context: ContextData
  termCodes: TerminologyCodeData[]
  timeRestriction?: TimeRestrictionData
  valueFilter?: ValueFilterData
}
