import { Display } from './Display';
import { Relatives } from './Relatives';

export interface Relations {
  display: Display
  parents: Relatives[]
  children: Relatives[]
  relatedTerms: Relatives[]
}
