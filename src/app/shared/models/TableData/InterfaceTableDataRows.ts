import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';

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
