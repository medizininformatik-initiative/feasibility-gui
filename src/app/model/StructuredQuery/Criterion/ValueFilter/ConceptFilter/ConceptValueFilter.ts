import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { AbstractConceptFilter } from '../../Abstract/ConceptFilter/AbstractConceptFilter';

export class ConceptValueFilter extends AbstractConceptFilter {
  constructor(selectedConcepts: TerminologyCode[] = []) {
    super(selectedConcepts);
  }

  public static createFilter(selectedConcepts: TerminologyCode[]) {
    return new ConceptValueFilter(Array.from(selectedConcepts));
  }
}
