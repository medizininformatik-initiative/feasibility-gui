import { AbstractCriterion } from './AbstractCriterion';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { CritGroupPosition } from '../CritGroupPosition';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { ValueFilter } from './AttributeFilter/ValueFilter';

export class ReferenceCriterion extends AbstractCriterion {
  private parentId: string;

  constructor(
    parentId: string,
    isReference: boolean,
    attributeFilters: Array<AttributeFilter>,
    context: TerminologyCode,
    criterionHash: string,
    display: string,
    isInvalid: boolean,
    position: CritGroupPosition,
    termCodes: Array<TerminologyCode>,
    timeRestriction: AbstractTimeRestriction,
    uniqueID: string,
    valueFilters: Array<ValueFilter>
  ) {
    super(
      isReference,
      attributeFilters,
      context,
      criterionHash,
      display,
      isInvalid,
      position,
      termCodes,
      timeRestriction,
      uniqueID,
      valueFilters
    );

    this.parentId = parentId;
  }

  public getParentId(): string {
    return this.parentId;
  }

  public setParentId(parentId: string): void {
    this.parentId = parentId;
  }
}
