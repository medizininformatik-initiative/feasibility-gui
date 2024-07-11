import { QuantityUnit } from 'src/app/model/QuantityUnit';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/QuantityFilterOptions';

/**
 * Class representing a QuantityRangeFilter.
 */
export class QuantityRangeFilter extends AbstractQuantityFilter {
  protected comparator: QuantityComparisonOption = QuantityComparisonOption.BETWEEN;
  private minValue: number | null = null;
  private maxValue: number | null = null;
  private readonly type: FilterTypes = FilterTypes.QUANTITY_RANGE;

  /**
   * Creates an instance of QuantityRangeFilter.
   *
   * @param selectedUnit - The selected quantity unit (inherited from AbstractQuantityFilter).
   * @param allowedUnits - The allowed quantity units (inherited from AbstractQuantityFilter).
   * @param precision - The precision of the quantity filter (inherited from AbstractQuantityFilter).
   * @param minValue - The minimum value of the quantity range.
   * @param maxValue - The maximum value of the quantity range.
   */
  constructor(
    selectedUnit: QuantityUnit,
    allowedUnits: QuantityUnit[] = [],
    precision: number = 0,
    minValue: number | null = null,
    maxValue: number | null = null
  ) {
    super(selectedUnit, allowedUnits, precision);
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  /**
   * Gets the minimum value of the quantity range.
   *
   * @returns The minimum value.
   */
  getMinValue(): number | null {
    return this.minValue;
  }

  /**
   * Sets the minimum value of the quantity range.
   *
   * @param minValue - The minimum value to set.
   */
  setMinValue(minValue: number | null): void {
    this.minValue = minValue;
  }

  /**
   * Gets the maximum value of the quantity range.
   *
   * @returns The maximum value.
   */
  getMaxValue(): number | null {
    return this.maxValue;
  }

  /**
   * Sets the maximum value of the quantity range.
   *
   * @param maxValue - The maximum value to set.
   */
  setMaxValue(maxValue: number | null): void {
    this.maxValue = maxValue;
  }

  /**
   * Gets the filter type.
   *
   * @returns The filter type.
   */
  getType(): FilterTypes {
    return this.type;
  }
}
