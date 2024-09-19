import { AbstractQuantityFilter } from '../../../../FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { CloneQuantityComparator } from './CloneQuantityComparator';
import { CloneQuantityRange } from './CloneQuantityRange';
import { FilterTypes } from '../../../FilterTypes';
import { QuantityComparatorFilter } from '../../../../FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from '../../../../FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';

export class CloneQuantityFilter {
  static deepCopyQuantityFilters(abstractQuantity: AbstractQuantityFilter): AbstractQuantityFilter {
    const quantityFilterType = abstractQuantity.getType();
    switch (quantityFilterType) {
      case FilterTypes.QUANTITY_RANGE:
        return CloneQuantityRange.deepCopyQuantityRangeFilter(
          abstractQuantity as QuantityRangeFilter
        );
      case FilterTypes.QUANTITY_COMPARATOR:
        return CloneQuantityComparator.deepCopyQuantityComparatorFilter(
          abstractQuantity as QuantityComparatorFilter
        );
      default:
        return undefined;
    }
  }
}
