import { AbstractTimeRestriction } from './AbstractTimeRestriction';
import { TimeRestrictionType } from '../../TimeRestriction';

export class BetweenFilter extends AbstractTimeRestriction {
  afterDate: string;
  beforeDate: string;
  protected readonly type: TimeRestrictionType = TimeRestrictionType.BETWEEN;

  constructor(afterDate: string, beforeDate: string) {
    super(afterDate, beforeDate);
    this.afterDate = afterDate;
    this.beforeDate = beforeDate;
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

  /**
   * Gets the date before which the restriction applies.
   *
   * @returns The before date.
   */
  getBeforeDate(): string {
    return this.beforeDate;
  }

  /**
   * Sets the date before which the restriction applies.
   *
   * @param beforeDate - The before date to set.
   */
  setBeforeDate(beforeDate: string): void {
    this.beforeDate = beforeDate;
  }
}
