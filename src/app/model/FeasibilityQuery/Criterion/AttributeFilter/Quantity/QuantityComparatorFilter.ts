import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { Comparator } from 'src/app/model/Comparator';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';

/**
 * Class representing a QuantityComparatorFilter.
 */
export class QuantityComparatorFilter extends AbstractQuantityFilter {
  private comparator: Comparator = Comparator.NONE;
  protected readonly type: FilterTypes = FilterTypes.QUANTITY_COMPARATOR;
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
    comparator: Comparator = Comparator.NONE,
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
  getComparator(): Comparator {
    return this.comparator;
  }

  /**
   * Sets the comparator type.
   *
   * @param comparator - The comparator type to set.
   */
  setComparator(comparator: Comparator): void {
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
