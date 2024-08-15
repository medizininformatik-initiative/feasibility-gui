import { Injectable } from '@angular/core';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';
import { FilterChipQuantityAdapter } from '../../../models/FilterChips/Adapter/FilterChipQuantityAdapter';
import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';

@Injectable({
  providedIn: 'root',
})
export class QuantityFilterChipService {
  constructor() {}

  /**
   * Generates quantity filter chips from an array of AttributeFilters.
   *
   * @param attributeFilters Array of AttributeFilter objects
   * @returns Array of InterfaceFilterChip
   */
  public generateQuantityChipsFromAttributeFilters(
    attributeFilters: AttributeFilter[]
  ): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];

    attributeFilters.forEach((attributeFilter) => {
      const quantityFilter = attributeFilter.getQuantity();
      if (quantityFilter) {
        chips.push(...this.generateQuantityChipsFromAttributeFilter(quantityFilter));
      }
    });

    return chips;
  }

  /**
   * Generates quantity filter chips from an array of ValueFilters.
   *
   * @param valueFilters Array of ValueFilter objects
   * @returns Array of InterfaceFilterChip
   */
  public generateQuantityChipsFromValueFilters(valueFilters: ValueFilter[]): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];

    valueFilters.forEach((valueFilter) => {
      const quantityFilter = valueFilter?.getQuantity();
      if (quantityFilter) {
        chips.push(...this.generateQuantityChipsFromValueFilter(quantityFilter));
      }
    });

    return chips;
  }

  /**
   * Generates quantity filter chips obtained from AttributeFilter.
   *
   * @param quantityFilter The AbstractQuantityFilter object
   * @returns Array of InterfaceFilterChip
   */
  private generateQuantityChipsFromAttributeFilter(
    quantityFilter: AbstractQuantityFilter
  ): InterfaceFilterChip[] {
    if (quantityFilter?.getComparator()) {
      return this.generateQuantityChips(quantityFilter);
    }
    return [];
  }

  /**
   * Generates quantity filter chips obtained from ValueFilter.
   *
   * @param quantityFilter The AbstractQuantityFilter object
   * @returns Array of InterfaceFilterChip
   */
  private generateQuantityChipsFromValueFilter(
    quantityFilter: AbstractQuantityFilter
  ): InterfaceFilterChip[] {
    if (quantityFilter?.getComparator()) {
      return this.generateQuantityChips(quantityFilter);
    }
    return [];
  }

  /**
   * Adapts the AbstractQuantityFilter into an array of InterfaceFilterChip.
   *
   * @param quantityFilter The AbstractQuantityFilter object
   * @returns Array of InterfaceFilterChip
   */
  private generateQuantityChips(quantityFilter: AbstractQuantityFilter): InterfaceFilterChip[] {
    return FilterChipQuantityAdapter.adaptQuantity(quantityFilter);
  }
}
