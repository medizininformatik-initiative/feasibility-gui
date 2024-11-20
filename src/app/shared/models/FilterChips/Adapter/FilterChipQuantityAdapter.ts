import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { getArithmeticSymbol } from 'src/app/model/Utilities/Quantity/ArithmeticSymbolResolver';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { v4 as uuidv4 } from 'uuid';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

export class FilterChipQuantityAdapter {
  public static adaptQuantity(quantity: AbstractQuantityFilter): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];

    if (quantity && quantity.getType() !== FilterTypes.QUANTITY_NOT_SET) {
      const display = quantity.getSelectedUnit().getDisplay();
      const comparator = quantity.getComparator();
      const symbol = getArithmeticSymbol(comparator);
      switch (comparator) {
        case QuantityComparisonOption.BETWEEN:
          chips.push(this.createQuantityRangeChip(quantity as QuantityRangeFilter, display));
          break;
        case QuantityComparisonOption.EQUAL:
        case QuantityComparisonOption.GREATER_THAN:
        case QuantityComparisonOption.LESS_THAN:
          chips.push(
            this.createQuantityComparatorChip(quantity as QuantityComparatorFilter, display, symbol)
          );
          break;
        default:
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

    return this.createFilterChip(FilterTypes.QUANTITY, text);
  }

  private static createQuantityComparatorChip(
    quantity: QuantityComparatorFilter,
    display: string,
    symbol
  ): InterfaceFilterChip {
    const value = quantity.getValue();
    const text = `${symbol} ${value} ${display}`;

    return this.createFilterChip(FilterTypes.QUANTITY, text);
  }

  /**
   * Creates a filter chip with the given type and text.
   *
   * @param type The type of filter chip
   * @param text The text to display in the chip
   * @returns An InterfaceFilterChip
   */
  private static createFilterChip(type: string, text: string): InterfaceFilterChip {
    const builder = new FilterChipBuilder(type);
    builder.addData(uuidv4(), this.createDisplayDataInstance(text));
    return builder.buildFilterChip();
  }

  private static createDisplayDataInstance(text: string) {
    const german = 'de-DE';
    const english = 'en-US';
    return new DisplayData(
      [text],
      [new Translation(german, [text]), new Translation(english, [text])]
    );
  }
}
