import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/QuantityUnit';

/**
 * Class representing a QuantityComparatorFilter.
 */
export class QuantityComparatorFilter extends AbstractQuantityFilter {
  protected comparator: QuantityComparisonOption = QuantityComparisonOption.NONE;
  private readonly type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
  private value: number | null = null;

  /**
   * Creates an instance of QuantityComparatorFilter.
   *
   * @param selectedUnit - The selected quantity unit (inherited from AbstractQuantityFilter).
   * @param allowedUnits - The allowed quantity units (inherited from AbstractQuantityFilter).
   * @param precision - The precision of the quantity filter (inherited from AbstractQuantityFilter).
   * @param comparator - The comparator type.
   * @param value - The comparison value.
   */
  constructor(
    selectedUnit: QuantityUnit,
    allowedUnits: QuantityUnit[] = [],
    precision: number = 0,
    comparator: QuantityComparisonOption = QuantityComparisonOption.NONE,
    value: number | null = null
  ) {
    super(selectedUnit, allowedUnits, precision);
    this.comparator = comparator;
    this.value = value;
  }

  /**
   * Gets the comparator type.
   *
   * @returns The comparator type.
   */
  getComparator(): QuantityComparisonOption {
    return this.comparator;
  }

  /**
   * Sets the comparator type.
   *
   * @param comparator - The comparator type to set.
   */
  setComparator(comparator: QuantityComparisonOption): void {
    this.comparator = comparator;
  }

  /**
   * Gets the comparison value.
   *
   * @returns The comparison value.
   */
  getValue(): number | null {
    return this.value;
  }

  /**
   * Sets the comparison value.
   *
   * @param value - The comparison value to set.
   */
  setValue(value: number | null): void {
    this.value = value;
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
