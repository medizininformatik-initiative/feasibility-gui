import { AttributeFilterBaseData } from './AttributeFilterBaseData';
import { AttributeFilterTypeData } from './AttributeFilterTypeData';
import { StructuredQueryCriterionData } from './StructuredQueryCriterionData';
import { TerminologyCodeBaseData } from './TerminologyBaseData';

export interface AttributeFilterData extends AttributeFilterBaseData {
  type: AttributeFilterTypeData
  criteria: StructuredQueryCriterionData
  attributeCode: TerminologyCodeBaseData
}
