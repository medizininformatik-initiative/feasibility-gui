import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/QuantityUnit';
import { QuantityComparatorFilter } from 'src/app/model/StructuredQuery/Criterion/AttributeFilters/QueryFilters/QuantityFilter/QuantityComparatorFilter';

/**
 * Abstract class representing a quantity filter.
 */
export abstract class AbstractQuantityFilter {
  private selectedUnit: QuantityUnit;
  private allowedUnits: QuantityUnit[] = [];
  private precision: number;
  protected comparator: QuantityComparisonOption = QuantityComparisonOption.NONE;

  /**
   * Creates an instance of AbstractQuantityFilter.
   *
   * @param selectedUnit - The selected quantity unit.
   * @param allowedUnits - The allowed quantity units.
   * @param precision - The precision of the quantity filter.
   */
  constructor(
    selectedUnit?: QuantityUnit,
    allowedUnits: QuantityUnit[] = [],
    precision: number = 0
  ) {
    this.selectedUnit = selectedUnit;
    this.allowedUnits = allowedUnits;
    this.precision = precision;
  }

  /**
   * Gets the selected quantity unit.
   *
   * @returns The selected quantity unit.
   */
  getSelectedUnit(): QuantityUnit {
    return this.selectedUnit;
  }

  /**
   * Sets the selected quantity unit.
   *
   * @param selectedUnit - The selected quantity unit.
   */
  setSelectedUnit(selectedUnit: QuantityUnit): void {
    this.selectedUnit = selectedUnit;
  }

  /**
   * Gets the allowed quantity units.
   *
   * @returns An array of allowed quantity units.
   */
  getAllowedUnits(): QuantityUnit[] {
    return this.allowedUnits;
  }

  /**
   * Sets the allowed quantity units.
   *
   * @param allowedUnits - An array of allowed quantity units.
   */
  setAllowedUnits(allowedUnits: QuantityUnit[]): void {
    this.allowedUnits = allowedUnits;
  }

  /**
   * Gets the precision of the quantity filter.
   *
   * @returns The precision value.
   */
  getPrecision(): number {
    return this.precision;
  }

  /**
   * Sets the precision of the quantity filter.
   *
   * @param precision - The precision value.
   */
  setPrecision(precision: number): void {
    this.precision = precision;
  }

  getComparator() {
    return this.comparator;
  }

  abstract getType(): FilterTypes;
}
