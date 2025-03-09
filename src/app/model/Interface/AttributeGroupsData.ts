import { AttributesData } from './AttributesData';
import { FilterData } from './FilterData';

export interface AttributeGroupsData {
  id: string
  includeReferenceOnly: boolean
  groupReference: string
  name: string
  attributes: AttributesData[]
  filter: FilterData[]
}
