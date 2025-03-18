export interface SavedDataQueryListItemData {
  id: string
  label: string
  comment: string
  content: null
  createdBy: null
  resultSize: number
  lastModified: string
  ccdl: {
    exists: boolean
    isValid: boolean
  }
  dataExtraction: {
    exists: boolean
    isValid: boolean
  }
}
