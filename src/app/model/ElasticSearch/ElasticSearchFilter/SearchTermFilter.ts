import { ElasticSearchFilterTypes } from '../../Utilities/ElasticSearchFilterTypes';
import { SearchTermFilterValues } from './SearchTermFilterValues';

export class SearchTermFilter {
  name: ElasticSearchFilterTypes;

  values: SearchTermFilterValues[] = [];
  selectedValues: string[] = [];

  /**
   * Constructs a new SearchTermFilter.
   *
   * @param name - The name of the filter.
   * @param values - An array of filter values.
   */
  constructor(name: ElasticSearchFilterTypes, values: SearchTermFilterValues[]) {
    this.name = name;
    this.values = values;
  }

  /**
   * Gets the name of the filter.
   *
   * @returns The name of the filter.
   */
  public getName(): ElasticSearchFilterTypes {
    return this.name;
  }

  /**
   * Sets the name of the filter.
   *
   * @param name - The new name of the filter.
   */
  public setName(name: ElasticSearchFilterTypes): void {
    this.name = name;
  }

  /**
   * Gets the filter values.
   *
   * @returns An array of filter values.
   */
  public getValues(): SearchTermFilterValues[] {
    return this.values;
  }

  /**
   * Sets the filter values.
   *
   * @param values - The new filter values.
   */
  public setValues(values: SearchTermFilterValues[]): void {
    this.values = values;
  }

  public setSelectedValues(values: string[]): void {
    this.selectedValues = values;
  }

  public getSelectedValues(): string[] {
    return this.selectedValues;
  }
}
