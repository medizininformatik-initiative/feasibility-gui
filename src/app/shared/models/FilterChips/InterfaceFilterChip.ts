import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

export interface InterfaceFilterChip {
  type: DisplayData | FilterTypes | TimeRestrictionType | string
  typeExpanded?: boolean
  data: InterfaceFilterChipData[]
}
