import { AbstractResultList } from './AbstractResultList';
import { SearchTermValueSetEntry } from '../ListEntries/SearchTermValueSetEntry';

export class CodeableConceptResultList extends AbstractResultList<SearchTermValueSetEntry> {
  constructor(totalHits: number, valueSetEntries: Array<SearchTermValueSetEntry>) {
    super(totalHits, valueSetEntries);
  }
}
