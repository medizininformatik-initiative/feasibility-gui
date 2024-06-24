import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';
import { QuantityUnit } from 'src/app/model/QuantityUnit';

export class QuantityNotSet extends AbstractQuantityFilter {
  type: FilterTypes = FilterTypes.QUANTITY_NOT_SET;

  /**
   * Static method to create a QuantityFilter.
   *
   * @param selectedUnit - The selected quantity unit.
   * @param allowedUnits - The allowed quantity units.
   * @param precision - The precision of the quantity filter.
   * @returns The created QuantityFilter instance.
   */
  static create(
    selectedUnit?: QuantityUnit,
    allowedUnits: QuantityUnit[] = [],
    precision: number = 0
  ): QuantityNotSet {
    return new QuantityNotSet(selectedUnit, allowedUnits, precision);
  }
}
