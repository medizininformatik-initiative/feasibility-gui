import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

export interface InterfaceFilterChip {
  type: Display | FilterTypes | TimeRestrictionType | string
  typeExpanded?: boolean
  twoLineDisplay?: boolean
  data: InterfaceFilterChipData[]
}
