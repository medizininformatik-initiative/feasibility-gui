export class SearchTermFilter {
  name: string;
  values: string[] = [];

  /**
   * Constructs a new SearchTermFilter.
   *
   * @param name - The name of the filter.
   * @param values - An array of filter values.
   */
  constructor(name: string, values: string[]) {
    this.name = name;
    this.values = values;
  }

  /**
   * Gets the name of the filter.
   *
   * @returns The name of the filter.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the filter.
   *
   * @param name - The new name of the filter.
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Gets the filter values.
   *
   * @returns An array of filter values.
   */
  public getValues(): string[] {
    return this.values;
  }

  /**
   * Sets the filter values.
   *
   * @param values - The new filter values.
   */
  public setValues(values: string[]): void {
    this.values = values;
  }
}
