import { DisplayData } from './DisplayData';
import { Relatives } from './Relatives';

export interface Relations {
  display: DisplayData
  parents: Relatives[]
  children: Relatives[]
  relatedTerms: Relatives[]
}
