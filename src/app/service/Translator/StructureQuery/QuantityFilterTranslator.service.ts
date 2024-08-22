import { Injectable } from '@angular/core';
import { QuantityComparatorFilter as QuantityComparatorFilterSQ } from '../../../model/StructuredQuery/Criterion/AttributeFilters/QuantityFilter/QuantityComparatorFilter';
import { QuantityComparatorFilter as QuantityComparatorFilterFQ } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter as QuantityRangeFilterSQ } from '../../../model/StructuredQuery/Criterion/AttributeFilters/QuantityFilter/QuantityRangeFilter';
import { QuantityRangeFilter as QuantityRangeFilterFQ } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit as QuantityUnitSQ } from '../../../model/StructuredQuery/QuantityUnit';
import { QuantityUnit as QuantityUnitFQ } from '../../../model/FeasibilityQuery/QuantityUnit';
import { FilterTypesService } from '../../FilterTypes.service';
import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';

@Injectable({
  providedIn: 'root',
})
export class QuantityFilterTranslatorService {
  constructor(private filter: FilterTypesService) {}

  /**
   * Creates a quantity filter based on the type of quantity filter.
   *
   * @param abstractAttributeFilter The attribute filter containing quantity details.
   * @returns The structured query quantity filter.
   */
  public translateQuantityFilter(abstractAttributeFilter: AbstractQuantityFilter) {
    const type = abstractAttributeFilter.getType();

    if (this.filter.isQuantityComparator(type)) {
      return this.createQuantityComparatorFilter(
        abstractAttributeFilter as QuantityComparatorFilterFQ
      );
    } else if (this.filter.isQuantityRange(type)) {
      return this.createQuantityRangeFilter(abstractAttributeFilter as QuantityRangeFilterFQ);
    }
    return undefined;
  }

  private createQuantityComparatorFilter(
    quantityComparator: QuantityComparatorFilterFQ
  ): QuantityComparatorFilterSQ | undefined {
    if (!this.filter.isNoneComparator(quantityComparator.getComparator())) {
      return this.setQuantityComparatorAttributes(quantityComparator);
    }
    return undefined;
  }

  private createQuantityRangeFilter(quantityRange: QuantityRangeFilterFQ): QuantityRangeFilterSQ {
    const rangeFilter = new QuantityRangeFilterSQ();
    rangeFilter.maxValue = quantityRange.getMaxValue();
    rangeFilter.minValue = quantityRange.getMinValue();
    rangeFilter.setUnit(this.assignQuantityUnit(quantityRange.getSelectedUnit()));
    return rangeFilter;
  }

  private setQuantityComparatorAttributes(
    quantityComparator: QuantityComparatorFilterFQ
  ): QuantityComparatorFilterSQ {
    const comparatorFilter = new QuantityComparatorFilterSQ();
    comparatorFilter.comparator = quantityComparator.getComparator();
    comparatorFilter.value = quantityComparator.getValue();
    comparatorFilter.setUnit(this.assignQuantityUnit(quantityComparator.getSelectedUnit()));
    return comparatorFilter;
  }

  private assignQuantityUnit(quantityUnit: QuantityUnitFQ): QuantityUnitSQ {
    return new QuantityUnitSQ(quantityUnit.getCode(), quantityUnit.getDisplay());
  }
}
