import { AbstractResultList } from './AbstractResultList';
import { CriteriaListEntry } from '../../../../../shared/models/ListEntries/CriteriaListListEntry';

export class CriteriaResultList extends AbstractResultList<CriteriaListEntry> {
  constructor(totalHits: number, valueSetEntries: Array<CriteriaListEntry>) {
    super(totalHits, valueSetEntries);
  }
}
