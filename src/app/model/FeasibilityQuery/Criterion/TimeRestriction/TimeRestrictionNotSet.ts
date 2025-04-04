import { TimeRestrictionType } from '../../TimeRestriction';
import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class TimeRestrictionNotSet extends AbstractTimeRestriction {
  protected type: TimeRestrictionType = TimeRestrictionType.NONE;

  constructor() {
    super(undefined, undefined);
  }

  /**
   *
   * @returns TimeRestrictionType
   */
  getType() {
    return this.type;
  }
}
