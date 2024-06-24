import { AbstractCriterion } from './AbstractCriterion';
import { AbstractTimeRestriction } from './TimeRestriction/AbstractTimeRestriction';
import { AttributeFilter } from './AttributeFilter/AttributeFilter';
import { CritGroupPosition } from '../CritGroupPosition';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { ValueFilter } from './AttributeFilter/ValueFilter';

/**
 * Class representing a specific criterion that extends the abstract criterion.
 */
export class Criterion extends AbstractCriterion {
  /**
   * Constructor for Criterion.
   *
   * @param attributeFilters - Array of AttributeFilter objects.
   * @param context - TerminologyCode object representing the context.
   * @param criterionHash - Hash string for the criterion.
   * @param display - Display string for the criterion.
   * @param isInvalid - Boolean flag indicating if the criterion is invalid.
   * @param position - CritGroupPosition object representing the position.
   * @param termCodes - Array of TerminologyCode objects.
   * @param timeRestriction - AbstractTimeRestriction object.
   * @param uniqueID - Unique identifier for the criterion.
   * @param valueFilters - Array of ValueFilter objects.
   */
  constructor(
    attributeFilters?: Array<AttributeFilter>,
    context?: TerminologyCode,
    criterionHash?: string,
    display?: string,
    isInvalid?: boolean,
    position?: CritGroupPosition,
    termCodes?: Array<TerminologyCode>,
    timeRestriction?: AbstractTimeRestriction,
    uniqueID?: string,
    valueFilters?: Array<ValueFilter>
  ) {
    super(
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
  }
}
