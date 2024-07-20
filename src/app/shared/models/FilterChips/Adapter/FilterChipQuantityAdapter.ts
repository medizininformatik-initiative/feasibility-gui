import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/QuantityFilterOptions';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { v4 as uuidv4 } from 'uuid';

export class FilterChipQuantityAdapter {
  public static adaptQuantity(quantity: AbstractQuantityFilter): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];

    if (quantity && quantity.getType() !== FilterTypes.QUANTITY_NOT_SET) {
      const display = quantity.getSelectedUnit().getDisplay();
      const comparator = quantity.getComparator();

      switch (comparator) {
        case QuantityComparisonOption.BETWEEN:
          chips.push(this.createQuantityRangeChip(quantity as QuantityRangeFilter, display));
          break;
        case QuantityComparisonOption.EQUAL:
        case QuantityComparisonOption.GREATER_THAN:
        case QuantityComparisonOption.LESS_THAN:
          chips.push(
            this.createQuantityComparatorChip(quantity as QuantityComparatorFilter, display)
          );
          break;
        default:
          console.warn('Unsupported comparator type:', comparator);
          break;
      }
    }
    return chips;
  }

  private static createQuantityRangeChip(
    quantity: QuantityRangeFilter,
    display: string
  ): InterfaceFilterChip {
    const minValue = quantity.getMinValue();
    const maxValue = quantity.getMaxValue();
    const text = `Between ${minValue} - ${maxValue} ${display}`;

    const builder = new FilterChipBuilder(FilterTypes.QUANTITY);
    builder.addData(uuidv4(), text);
    return builder.buildFilterChip();
  }

  private static createQuantityComparatorChip(
    quantity: QuantityComparatorFilter,
    display: string
  ): InterfaceFilterChip {
    const value = quantity.getValue();
    const text = `${value} ${display}`;

    const builder = new FilterChipBuilder(FilterTypes.QUANTITY);
    builder.addData(uuidv4(), text);
    return builder.buildFilterChip();
  }
}
