import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/QuantityUnit';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';

@Component({
  selector: 'num-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent implements OnInit {
  FilterTypes: typeof FilterTypes = FilterTypes;

  @Input()
  quantityFilter: AbstractQuantityFilter;

  @Output()
  quantityFilterChange = new EventEmitter<AbstractQuantityFilter>();

  quantityComparatorFilter: QuantityComparatorFilter;

  quantityRangeFilter: QuantityRangeFilter;

  selectedQuantityFilterOption: QuantityComparisonOption = QuantityComparisonOption.NONE;

  selectedQuantityFilterUnit: QuantityUnit;

  selectedQuantityValue: number;

  selectedQuantityMinValue: number;

  selectedQuantityMaxValue: number;

  QuantityComparisonOption: typeof QuantityComparisonOption = QuantityComparisonOption;

  ngOnInit() {}

  setQuantityFilterType() {
    const type: FilterTypes = this.quantityFilter.getType();
    if (type === FilterTypes.QUANTITY_COMPARATOR) {
      this.quantityComparatorFilter = this.quantityFilter as QuantityComparatorFilter;
    }
    if (type === FilterTypes.QUANTITY_RANGE) {
      this.quantityRangeFilter = this.quantityFilter as QuantityRangeFilter;
    }
  }

  setSelectedQuantityFilterOption(option: QuantityComparisonOption): void {
    this.selectedQuantityFilterOption = option;
    this.buildQuantityFilter();
  }

  setSelectQuantityFilterUnit(selectedUnit: QuantityUnit) {
    this.selectedQuantityFilterUnit = new QuantityUnit(
      selectedUnit.getCode(),
      selectedUnit.getDisplay(),
      selectedUnit.getSystem()
    );
    this.buildQuantityFilter();
  }

  setSelectedQuantityValue(value: number) {
    this.selectedQuantityValue = value;
    this.buildQuantityFilter();
  }

  setSelectedQuantityValues(values: { min: number; max: number }) {
    this.selectedQuantityMinValue = values.min;
    this.selectedQuantityMaxValue = values.max;
    this.buildQuantityFilter();
  }

  private buildQuantityFilter() {
    if (
      this.selectedQuantityFilterOption !== QuantityComparisonOption.NONE &&
      this.selectedQuantityFilterUnit &&
      this.selectedQuantityValue !== undefined
    ) {
      const quantityFilter = new QuantityComparatorFilter(
        this.selectedQuantityFilterUnit,
        this.quantityFilter.getAllowedUnits(),
        this.quantityFilter.getPrecision(),
        this.selectedQuantityFilterOption,
        this.selectedQuantityValue
      );

      this.quantityFilterChange.emit(quantityFilter);
    }
    if (
      this.selectedQuantityFilterOption !== QuantityComparisonOption.NONE &&
      this.selectedQuantityFilterUnit &&
      this.selectedQuantityMinValue !== undefined &&
      this.selectedQuantityMaxValue !== undefined
    ) {
      const quantityFilter = new QuantityRangeFilter(
        this.selectedQuantityFilterUnit,
        this.quantityFilter.getAllowedUnits(),
        this.quantityFilter.getPrecision(),
        this.selectedQuantityMinValue,
        this.selectedQuantityMaxValue
      );
      this.quantityFilterChange.emit(quantityFilter);
    }
  }

  roundMinValue(): void {}

  roundMaxValue(): void {}

  roundValue(): void {}

  valueTooSmall(value: any): boolean {
    return true;
  }

  valueTooLarge(value: any): boolean {
    return true;
  }

  minimumSmallerMaximum(): boolean {
    return true;
  }

  compareFunction = (o1: any, o2: any) => o1 && o2 && o1.id === o2.id;
}

const transformQuantityFilter = (abstractQuantityFilter: AbstractQuantityFilter): QuantityComparatorFilter | QuantityRangeFilter => {
  const type: FilterTypes = abstractQuantityFilter.getType();
  if (type === FilterTypes.QUANTITY_COMPARATOR) {
    return abstractQuantityFilter as QuantityComparatorFilter;
  }
  if (type === FilterTypes.QUANTITY_RANGE) {
    return abstractQuantityFilter as QuantityRangeFilter;
  }
};
