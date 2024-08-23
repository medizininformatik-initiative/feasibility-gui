import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';

@Component({
  selector: 'num-quantity-range',
  templateUrl: './quantity-range.component.html',
  styleUrls: ['./quantity-range.component.scss'],
})
export class QuantityRangeComponent {
  FilterTypes: typeof FilterTypes = FilterTypes;

  @Input()
  minValue: number;
  @Input()
  maxValue: number;

  @Output()
  quantityValues: EventEmitter<{ min: number; max: number }> = new EventEmitter();


  emitValues() {
    const values = { min: this.minValue, max: this.maxValue };
    this.quantityValues.emit(values);
  }
}
