import { InterfaceListEntry } from 'src/app/model/Interface/Search/ListEntryData';

export interface InterfaceTableDataRow {
  id: string
  data: any[]
  hasCheckbox?: boolean
  isCheckboxSelected?: boolean
  isClickable?: boolean
  isDisabled: boolean
  checkboxColumnIndex?: number
  originalEntry: InterfaceListEntry
}
