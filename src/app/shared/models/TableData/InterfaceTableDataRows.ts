import { AbstractListEntry } from 'src/app/model/Search/ListEntries/AbstractListEntry';

export interface InterfaceTableDataRow {
  id: string
  data: any[]
  hasCheckbox?: boolean
  isCheckboxSelected?: boolean
  isClickable?: boolean
  isDisabled: boolean
  checkboxColumnIndex?: number
  originalEntry: AbstractListEntry
}
