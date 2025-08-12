import { AbstractResultList } from './AbstractResultList';
import { CodeableConceptResultListEntry } from '../ListEntries/CodeableConceptResultListEntry';

export class CodeableConceptResultList extends AbstractResultList<CodeableConceptResultListEntry> {
  constructor(totalHits: number, valueSetEntries: Array<CodeableConceptResultListEntry>) {
    super(totalHits, valueSetEntries);
  }
}
