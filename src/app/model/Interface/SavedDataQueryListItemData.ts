export interface SavedDataQueryListItemData {
  id: string
  label: string
  comment: string
  resultSize?: number
  lastModified: string
  ccdl: {
    exists: boolean
    isValid: boolean
  }
  dataSelection: {
    exists: boolean
    isValid: boolean
  }
}
