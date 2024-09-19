/**
 * Abstract class for time restrictions in a structured query.
 *
 * @abstract
 */
export abstract class AbstractTimeRestriction {
  private afterDate?: string;
  private beforeDate?: string;

  /**
   * Constructor to initialize the AbstractTimeRestriction with attribute code, type, afterDate, and beforeDate.
   *
   * @param afterDate - The date that marks the start of the time restriction.
   * @param [beforeDate] - The date that marks the end of the time restriction.
   */
  constructor(afterDate?: string, beforeDate?: string) {
    this.afterDate = afterDate;
    this.beforeDate = beforeDate;
  }

  /**
   * Gets the afterDate value.
   *
   * @returns The afterDate value.
   */
  public getAfterDate(): string {
    return this.afterDate;
  }

  /**
   * Sets the afterDate value.
   *
   * @param afterDate - The new afterDate value to set.
   */
  public setAfterDate(afterDate: string): void {
    this.afterDate = afterDate;
  }

  /**
   * Gets the beforeDate value.
   *
   * @returns The beforeDate value.
   */
  public getBeforeDate(): string | undefined {
    return this.beforeDate;
  }

  /**
   * Sets the beforeDate value.
   *
   * @param beforeDate - The new beforeDate value to set.
   */
  public setBeforeDate(beforeDate: string): void {
    this.beforeDate = beforeDate;
  }
}
