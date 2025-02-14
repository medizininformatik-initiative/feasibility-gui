import { Display } from './DisplayData';
import { Relatives } from './Relatives';

export interface Relations {
  display: Display
  parents: Relatives[]
  children: Relatives[]
  relatedTerms: Relatives[]
}
