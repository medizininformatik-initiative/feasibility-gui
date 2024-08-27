import { CloneTerminologyCode } from '../../TerminologyCode/CloneTerminologyCode';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';

export class CloneConceptFilter {
  /**
   * Creates a deep copy of a ConceptFilter instance.
   *
   * @param conceptFilter - The ConceptFilter instance to deep copy.
   * @returns A new ConceptFilter instance that is a deep copy of the given instance.
   */
  static deepCopyConceptFilter(conceptFilter: ConceptFilter): ConceptFilter {
    const copiedSelectedConcepts = CloneTerminologyCode.deepCopyTerminologyCodes(
      conceptFilter.getSelectedConcepts()
    );
    return new ConceptFilter(conceptFilter.getAllowedConceptUri(), copiedSelectedConcepts);
  }
}
