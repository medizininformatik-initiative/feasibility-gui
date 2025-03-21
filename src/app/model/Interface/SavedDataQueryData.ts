import { CRTDLData } from './CRTDLData';

export interface SavedDataQueryData {
  id: number
  content: CRTDLData
  comment: string
  label: string
  issue: []
  resultSize: number
  lastModified: string // ISO date string
  createdBy: string
  ccdl: {
    exists: boolean
    isValid: boolean
  }
  dataExtraction: {
    exists: boolean
    isValid: boolean
  }
}
