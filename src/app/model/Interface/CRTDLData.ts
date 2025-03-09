import { DataExtractionData } from './DataExtractionData';
import { StructuredQueryData } from './StructuredQueryData';

export interface CRTDLData {
  cohortDefinition: StructuredQueryData
  dataExtraction: DataExtractionData
  display: string
  version: string
}
