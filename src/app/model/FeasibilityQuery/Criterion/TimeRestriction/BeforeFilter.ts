import { AbstractTimeRestriction } from './AbstractTimeRestriction';
import { TimeRestrictionType } from '../../TimeRestriction';

export class BeforeFilter extends AbstractTimeRestriction {
  beforeDate: string;
  protected readonly type: TimeRestrictionType = TimeRestrictionType.BEFORE;

  constructor(beforeDate: string) {
    super();
    this.beforeDate = beforeDate;
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
