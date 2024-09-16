import { AbstractQuantityRangeFilter } from '../../Abstract/Quantity/Range/AbstractQuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';

export class QuantityRangeValueFilter extends AbstractQuantityRangeFilter {
  public static createFilter(minValue: number, maxValue: number, unit: QuantityUnit) {
    return new QuantityRangeValueFilter(minValue, maxValue, unit);
  }
}
