import { AbstractTimeRestriction } from '../../../FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from '../../../FeasibilityQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from '../../../FeasibilityQuery/Criterion/TimeRestriction/AtFilter';
import { BeforeFilter } from '../../../FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from '../../../FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { TimeRestrictionType } from '../../../FeasibilityQuery/TimeRestriction';

export class CloneTimeRestriction {
  /**
   * Creates a deep copy of an AbstractTimeRestriction instance based on its type.
   *
   * @param timeRestriction - The AbstractTimeRestriction instance to copy.
   * @returns A new instance of AbstractTimeRestriction that is a deep copy of the given instance.
   */
  public static deepCopyTimeRestriction(
    timeRestriction: AbstractTimeRestriction
  ): AbstractTimeRestriction {
    if (!timeRestriction) {
      throw new Error('No time restriction provided');
    }
    switch (timeRestriction.getType()) {
      case TimeRestrictionType.AFTER:
        return new AfterFilter(timeRestriction.getAfterDate());
      case TimeRestrictionType.BEFORE:
        return new BeforeFilter(timeRestriction.getAfterDate());
      case TimeRestrictionType.AT:
        return new AtFilter(timeRestriction.getAfterDate(), timeRestriction.getBeforeDate());
      case TimeRestrictionType.BETWEEN:
        return new BetweenFilter(timeRestriction.getAfterDate(), timeRestriction.getBeforeDate());
      default:
        throw new Error('Unsupported time restriction type: ' + timeRestriction.getType());
    }
  }
}
