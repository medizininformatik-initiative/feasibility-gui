import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityNotSet } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';

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

  selectedQuantityFilterOption: QuantityComparisonOption; //= QuantityComparisonOption.NONE;

  selectedQuantityFilterUnit: QuantityUnit;

  selectedQuantityValue: number;

  selectedQuantityMinValue: number;

  selectedQuantityMaxValue: number;

  QuantityComparisonOption: typeof QuantityComparisonOption = QuantityComparisonOption;

  ngOnInit() {
    this.setQuantityFilterType();
    if (!this.quantityFilter.getSelectedUnit()) {
      this.setSelectQuantityFilterUnit(this.quantityFilter.getAllowedUnits()[0]);
    }
    this.selectedQuantityFilterOption = this.quantityFilter.getComparator();
  }

  private setQuantityFilterType() {
    const type: FilterTypes = this.quantityFilter.getType();
    if (type === FilterTypes.QUANTITY_COMPARATOR) {
      this.quantityComparatorFilter = this.quantityFilter as QuantityComparatorFilter;
      this.selectedQuantityValue = this.quantityComparatorFilter.getValue();
    }
    if (type === FilterTypes.QUANTITY_RANGE) {
      this.quantityRangeFilter = this.quantityFilter as QuantityRangeFilter;
      this.selectedQuantityMinValue = this.quantityRangeFilter.getMinValue();
      this.selectedQuantityMaxValue = this.quantityRangeFilter.getMaxValue();
    }
  }

  public setSelectedQuantityFilterOption(option: QuantityComparisonOption): void {
    this.selectedQuantityFilterOption =
      QuantityComparisonOption[option as keyof typeof QuantityComparisonOption];
    if (option !== QuantityComparisonOption.NONE) {
      this.setQuantityFilterType();
      this.buildQuantityFilter();
    } else {
      this.quantityFilterChange.emit(new QuantityNotSet());
    }
  }

  public setSelectQuantityFilterUnit(selectedUnit: QuantityUnit) {
    this.selectedQuantityFilterUnit = new QuantityUnit(
      selectedUnit.getCode(),
      selectedUnit.getDisplay(),
      selectedUnit.getSystem()
    );
    this.buildQuantityFilter();
  }

  public setSelectedQuantityValue(value: number) {
    this.selectedQuantityValue = value;
    this.buildQuantityFilter();
  }

  public setSelectedQuantityValues(values: { min: number; max: number }) {
    this.selectedQuantityMinValue = values.min;
    this.selectedQuantityMaxValue = values.max;
    this.buildQuantityFilter();
  }

  private buildQuantityFilter(): void {
    if (
      this.selectedQuantityFilterOption !== QuantityComparisonOption.BETWEEN &&
      this.selectedQuantityFilterOption !== QuantityComparisonOption.NONE &&
      this.isComparatorFilterValueSet()
    ) {
      this.emitQuantityComparatorFilter();
    } else if (
      this.selectedQuantityFilterOption === QuantityComparisonOption.BETWEEN &&
      this.isRangeFilterValuesSet()
    ) {
      this.emitQuantityRangeFilter();
    }
  }

  private isComparatorFilterValueSet(): boolean {
    return this.selectedQuantityFilterUnit != null && this.selectedQuantityValue != null;
  }

  private isRangeFilterValuesSet(): boolean {
    return (
      this.selectedQuantityFilterUnit != null &&
      this.selectedQuantityMinValue != null &&
      this.selectedQuantityMaxValue != null
    );
  }

  private emitQuantityComparatorFilter(): void {
    const quantityFilter = new QuantityComparatorFilter(
      this.selectedQuantityFilterUnit,
      this.quantityFilter.getAllowedUnits(),
      this.quantityFilter.getPrecision(),
      this.selectedQuantityFilterOption,
      this.selectedQuantityValue
    );
    this.quantityFilterChange.emit(quantityFilter);
  }

  private emitQuantityRangeFilter(): void {
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
