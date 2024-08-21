import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';
import { AbstractProfileFilter } from './AbstractProfileFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';

export class ProfileDateFilter extends AbstractProfileFilter {
  private timeRestriction: AbstractTimeRestriction;

  constructor(name: string, ui_type: string, timeRestriction: AbstractTimeRestriction) {
    super(CRTDLFilterTypes.DATE, name, ui_type);
    this.timeRestriction = timeRestriction;
  }

  public setTimeRestriction(timeRestriction: AbstractTimeRestriction) {
    this.timeRestriction = timeRestriction;
  }

  public getTimeRestriction(): AbstractTimeRestriction {
    return this.timeRestriction;
  }
}
