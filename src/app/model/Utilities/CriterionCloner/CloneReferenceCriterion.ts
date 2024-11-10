import { AbstractCriterion } from '../../FeasibilityQuery/Criterion/AbstractCriterion';
import { CloneAttributeFilter } from './ValueAttributeFilter/CloneAttributeFilter';
import { CloneTerminologyCode } from './TerminologyCode/CloneTerminologyCode';
import { CloneTimeRestriction } from './TimeRestriction/CloneTimeRestriction';
import { CloneValueFilter } from './ValueAttributeFilter/CloneValueFilter';
import { CriterionBuilder } from '../../FeasibilityQuery/Criterion/CriterionBuilder';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export class CloneAbstractCriterion {
  static deepCopyAbstractCriterions(abstractCriterions: AbstractCriterion[]): AbstractCriterion[] {
    return abstractCriterions.map((abstractCriterion) =>
      this.deepCopyAbstractCriterion(abstractCriterion)
    );
  }

  static deepCopyAbstractCriterion(abstractCriterion: AbstractCriterion): AbstractCriterion {
    const clonedAttributeFilters = CloneAttributeFilter.deepCopyAttributeFilters(
      abstractCriterion.getAttributeFilters()
    );
    const clonedValueFilters = CloneValueFilter.deepCopyValueFilters(
      abstractCriterion.getValueFilters()
    );
    const clonedTimeRestriction = CloneTimeRestriction.deepCopyTimeRestriction(
      abstractCriterion.getTimeRestriction()
    );

    const mandatoryFields = this.createMandatoryFields(abstractCriterion);
    const criterionBuilder: CriterionBuilder = new CriterionBuilder(mandatoryFields);
    criterionBuilder
      .withAttributeFilters(clonedAttributeFilters)
      .withTimeRestriction(clonedTimeRestriction)
      .withValueFilters(clonedValueFilters);

    return abstractCriterion.getisReference()
      ? criterionBuilder.buildReferenceCriterion()
      : criterionBuilder.buildCriterion();
  }

  private static createMandatoryFields(abstractCriterion: AbstractCriterion): {
    isReference: boolean
    context: TerminologyCode
    criterionHash: string
    display: string
    isInvalid: boolean
    isRequiredFilterSet: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = CloneTerminologyCode.deepCopyTerminologyCode(abstractCriterion.getContext());
    const termCodes = CloneTerminologyCode.deepCopyTerminologyCodes(
      abstractCriterion.getTermCodes()
    );
    const display = abstractCriterion.getTermCodes()[0].getDisplay();
    const criterionHash = abstractCriterion.getCriterionHash();

    return {
      isReference: abstractCriterion.getisReference(),
      context,
      criterionHash,
      display,
      isInvalid: abstractCriterion.getIsInvalid(),
      isRequiredFilterSet: abstractCriterion.getIsRequiredFilterSet(),
      uniqueID: uuidv4(),
      termCodes,
    };
  }
}
