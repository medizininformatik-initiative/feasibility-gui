import { AttributeFilterBaseData } from './AttributeFilterBaseData';
import { AttributeFilterTypeData } from './AttributeFilterTypeData';
import { ReferenceCriteriaData } from './ReferenceCriteriaData';
import { TerminologyCodeBaseData } from './TerminologyBaseData';

export interface AttributeFilterData extends AttributeFilterBaseData {
  readonly type: AttributeFilterTypeData
  readonly criteria: ReferenceCriteriaData[]
  readonly attributeCode: TerminologyCodeBaseData
}
