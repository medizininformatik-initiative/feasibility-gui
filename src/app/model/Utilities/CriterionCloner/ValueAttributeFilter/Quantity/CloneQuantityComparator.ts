import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { CloneQuantityUnit } from './CloneQuantityUnit';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';

export class CloneQuantityComparator {
  /**
   * Creates a deep copy of a QuantityComparatorFilter instance.
   *
   * @param quantityComparatorFilter - The QuantityComparatorFilter instance to deep copy.
   * @returns A new QuantityComparatorFilter instance that is a deep copy of the given instance.
   */
  static deepCopyQuantityComparatorFilter(
    quantityComparatorFilter: QuantityComparatorFilter
  ): QuantityComparatorFilter {
    if (!(quantityComparatorFilter instanceof QuantityComparatorFilter)) {
      throw new Error('Invalid instance type for deep copy');
    }

    const copiedSelectedUnit = quantityComparatorFilter.getSelectedUnit()
      ? CloneQuantityUnit.deepCopyQuantityUnit(
          quantityComparatorFilter.getSelectedUnit() as QuantityUnit
        )
      : undefined;

    const copiedAllowedUnits = CloneQuantityUnit.deepCopyQuantityUnits(
      quantityComparatorFilter.getAllowedUnits()
    );

    return new QuantityComparatorFilter(
      copiedSelectedUnit,
      copiedAllowedUnits,
      quantityComparatorFilter.getPrecision(),
      quantityComparatorFilter.getComparator(),
      quantityComparatorFilter.getValue()
    );
  }
}
