import { AbstractProfileFilter } from './AbstractProfileFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';

export class ProfileTimeRestrictionFilter extends AbstractProfileFilter {
  private timeRestriction: AbstractTimeRestriction;

  constructor(name: string, type: string, timeRestriction: AbstractTimeRestriction) {
    super(type, name, DataSelectionFilterTypes.TIMERESTRICTION);
    this.timeRestriction = timeRestriction;
  }

  public setTimeRestriction(timeRestriction: AbstractTimeRestriction) {
    this.timeRestriction = timeRestriction;
  }

  public getTimeRestriction(): AbstractTimeRestriction {
    return this.timeRestriction;
  }
}
