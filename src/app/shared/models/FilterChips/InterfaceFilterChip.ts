import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';

export interface InterfaceFilterChip {
  type: FilterTypes | TimeRestrictionType | string
  data: InterfaceFilterChipData[]
}
