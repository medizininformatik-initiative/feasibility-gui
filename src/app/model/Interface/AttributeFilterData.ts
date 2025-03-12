import { AttributeFilterBaseData } from './AttributeFilterBaseData';
import { AttributeFilterTypeData } from './AttributeFilterTypeData';

export interface AttributeFilterData extends AttributeFilterBaseData {
  type: AttributeFilterTypeData
}
