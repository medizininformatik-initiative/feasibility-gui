import { CriteriaRelativeData } from './CriteriaRelativesData';
import { DisplayData } from './DisplayData';

export interface CriteriaRelationsData {
  display: DisplayData
  parents: CriteriaRelativeData[]
  children: CriteriaRelativeData[]
  relatedTerms: CriteriaRelativeData[]
}
