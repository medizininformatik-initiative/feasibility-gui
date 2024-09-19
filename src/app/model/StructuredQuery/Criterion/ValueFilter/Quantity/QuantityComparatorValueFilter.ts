import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';
import { AbstractQuantityComparatorFilter } from '../../Abstract/Quantity/Comparator/AbstractQuantityComparatorFilter';

export class QuantityComparatorValueFilter extends AbstractQuantityComparatorFilter {
  public static createFilter(
    unit: QuantityUnit,
    comparator: QuantityComparisonOption,
    value: number
  ) {
    return new QuantityComparatorValueFilter(unit, comparator, value);
  }
}
