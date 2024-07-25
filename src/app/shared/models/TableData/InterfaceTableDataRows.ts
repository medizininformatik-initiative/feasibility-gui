import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';

export interface InterfaceTableDataRow {
  id: string
  data: string[]
  hasCheckbox?: boolean
  isCheckboxSelected?: boolean
  isClickable?: boolean
  checkboxColumnIndex?: number
  originalEntry: InterfaceListEntry
}
