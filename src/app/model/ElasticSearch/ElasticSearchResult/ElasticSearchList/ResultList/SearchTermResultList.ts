import { AbstractResultList } from './AbstractResultList';
import { SearchTermListEntry } from '../../../../../shared/models/ListEntries/SearchTermListEntry';

export class SearchTermResultList extends AbstractResultList<SearchTermListEntry> {
  constructor(totalHits: number, valueSetEntries: Array<SearchTermListEntry>) {
    super(totalHits, valueSetEntries);
  }
}
