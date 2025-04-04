import { CohortDefinitionStatus } from '../Types/CohortDefinitionStatus';
import { DataExtractionStatus } from '../Types/DataExtractionStatus';
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
  ccdl: CohortDefinitionStatus
  dataExtraction: DataExtractionStatus
}
