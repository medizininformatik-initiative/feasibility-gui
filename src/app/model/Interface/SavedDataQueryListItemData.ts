export interface SavedDataQueryListItemData {
  id: string
  label: string
  comment: string
  totalNumberOfResults?: number
  createdAt: string
  ccdl: {
    exists: boolean
    isValid: boolean
  }
  dataSelection: {
    exists: boolean
    isValid: boolean
  }
}
