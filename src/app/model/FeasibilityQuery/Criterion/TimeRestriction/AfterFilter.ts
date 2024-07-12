import { AbstractTimeRestriction } from './AbstractTimeRestriction';
import { TimeRestrictionType } from '../../TimeRestriction';

export class AfterFilter extends AbstractTimeRestriction {
  afterDate: string;
  protected readonly type: TimeRestrictionType = TimeRestrictionType.AFTER;

  constructor(afterDate: string) {
    super();
    this.afterDate = afterDate;
  }

  /**
   * Gets the date after which the restriction applies.
   *
   * @returns The after date.
   */
  getAfterDate(): string {
    return this.afterDate;
  }

  /**
   * Sets the date after which the restriction applies.
   *
   * @param afterDate - The after date to set.
   */
  setAfterDate(afterDate: string): void {
    this.afterDate = afterDate;
  }
}
