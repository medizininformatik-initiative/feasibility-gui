import { CloneAbstractCriterion } from '../../CloneReferenceCriterion';
import { CloneConcept } from '../Concept/CloneConcept';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { ReferenceFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { v4 as uuidv4 } from 'uuid';

export class CloneReferenceFilter {
  /**
   * Creates a deep copy of a ReferenceFilter instance.
   *
   * @param referenceFilter - The ReferenceFilter instance to deep copy.
   * @returns A new ReferenceFilter instance that is a deep copy of the given instance.
   */
  static deepCopyReferenceFilter(referenceFilter: ReferenceFilter): ReferenceFilter {
    if (!(referenceFilter instanceof ReferenceFilter)) {
      throw new Error('Invalid instance type for deep copy');
    }
    const copiedSelectedReferences = CloneAbstractCriterion.deepCopyAbstractCriterions(
      referenceFilter.getSelectedReferences()
    ) as ReferenceCriterion[];

    const copiedSelectedConcepts = CloneConcept.deepCopyConcepts(
      referenceFilter.getSelectedConcepts()
    );

    return new ReferenceFilter(
      uuidv4(),
      referenceFilter.getAllowedReferenceUri(),
      copiedSelectedReferences,
      copiedSelectedConcepts
    );
  }
}
