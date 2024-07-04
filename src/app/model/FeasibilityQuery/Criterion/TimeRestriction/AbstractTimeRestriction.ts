import { TimeRestrictionType } from '../../TimeRestriction';

/**
 * Abstract class representing a Time Restriction.
 */
export abstract class AbstractTimeRestriction {
  beforeDate?: string;
  afterDate?: string;
  type: TimeRestrictionType;

  /**
   * Creates an instance of AbstractTimeRestriction.
   *
   * @param beforeDate - Date before which the restriction applies.
   * @param afterDate - Date after which the restriction applies.
   * @param type - Type of time restriction.
   */
  constructor(beforeDate?: string, afterDate?: string) {
    this.beforeDate = beforeDate;
    this.afterDate = afterDate;
  }

  /**
   * Gets the date before which the restriction applies.
   *
   * @returns The before date.
   */
  getBeforeDate(): string | undefined {
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

  /**
   * Gets the date after which the restriction applies.
   *
   * @returns The after date.
   */
  getAfterDate(): string | undefined {
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
