import { Component, EventEmitter, Output } from '@angular/core';
import { FilterTypes } from 'src/app/model/FilterTypes';

@Component({
  selector: 'num-quantity-range',
  templateUrl: './quantity-range.component.html',
  styleUrls: ['./quantity-range.component.scss'],
})
export class QuantityRangeComponent {
  FilterTypes: typeof FilterTypes = FilterTypes;

  @Output()
  quantityValues: EventEmitter<{ min: number; max: number }> = new EventEmitter();

  minValue: number;
  maxValue: number;

  emitValues() {
    const values = { min: this.minValue, max: this.maxValue };
    this.quantityValues.emit(values);
  }
}
