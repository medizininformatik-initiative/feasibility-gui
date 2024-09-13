import { AbstractConceptFilter } from './AbstractConceptFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ConceptValueFilter extends AbstractConceptFilter {
  constructor(selectedConcepts: TerminologyCode[] = []) {
    super(selectedConcepts);
  }
}
