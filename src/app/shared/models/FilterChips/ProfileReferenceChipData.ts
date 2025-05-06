import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';

export interface ProfileReferenceChipData extends InterfaceFilterChipData {
  id: string
  text: string
  expanded: boolean
  type: string
  typeExpanded?: boolean
  twoLineDisplay?: boolean
  data: ProfileReferenceChipData[]
}

export interface ProfileReferenceGroup {
  elementId: string
  profiles: Display[]
}
