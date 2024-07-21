import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityUnit } from 'src/app/model/QuantityUnit';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityNotSet } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';

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

  public setSelectedQuantityFilterOption(option: QuantityComparisonOption): void {
    this.selectedQuantityFilterOption = option;
    if (option !== QuantityComparisonOption.NONE) {
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
    if (this.isBetweenFilter()) {
      this.emitQuantityComparatorFilter();
    } else if (this.isRangeFilter()) {
      this.emitQuantityRangeFilter();
    }
  }

  private isBetweenFilter(): boolean {
    return this.selectedQuantityFilterUnit != null && this.selectedQuantityValue != null;
  }

  private isRangeFilter(): boolean {
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
