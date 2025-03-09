import { StructuredQueryCriterionData } from './StructuredQueryCriterionData';

export interface StructuredQueryData {
  version: string
  display: string
  inclusionCriteria: StructuredQueryCriterionData[][]
  exclusionCriteria: StructuredQueryCriterionData[][]
}
