import { TimeRestrictionType } from '../../TimeRestriction';
import { AbstractTimeRestriction } from './AbstractTimeRestriction';

export class TimeRestrictionNotSet extends AbstractTimeRestriction {
  protected type: TimeRestrictionType = TimeRestrictionType.NONE;

  constructor() {
    super(undefined, undefined);
  }

  /**
   * @returns The type of time restriction
   */
  public getType(): TimeRestrictionType {
    return this.type;
  }
}
