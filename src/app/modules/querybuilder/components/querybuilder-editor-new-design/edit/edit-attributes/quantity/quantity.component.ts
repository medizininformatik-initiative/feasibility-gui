import { Component, Input } from '@angular/core';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';

@Component({
  selector: 'num-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent {
  FilterTypes: typeof FilterTypes = FilterTypes;

  @Input() valueFilter: ValueFilter;
  @Input() filterType: string;
  @Input() attributeFilter: any;
  @Input() optional: boolean;
  @Input() quantityFilterOption: any;
  @Input() quantityFilterOptions: any[];

  getQuantityType() {}

  selectQuantityFilterOption(option: any): void {}

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
