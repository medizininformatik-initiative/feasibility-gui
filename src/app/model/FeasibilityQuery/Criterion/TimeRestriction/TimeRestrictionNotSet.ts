import { TimeRestrictionType } from '../../TimeRestriction';
import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class TimeRestrictionNotSet extends AbstractTimeRestriction {
  protected type: TimeRestrictionType = TimeRestrictionType.NONE;

  constructor() {
    super(null, null);
  }

  /**
   *
   * @returns TimeRestrictionType
   */
  getType() {
    return this.type;
  }
}
