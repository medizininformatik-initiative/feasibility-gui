import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

export interface InterfaceFilterChip {
  type: FilterTypes | TimeRestrictionType | string
  data: InterfaceFilterChipData[]
}
