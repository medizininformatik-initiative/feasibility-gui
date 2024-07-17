import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'num-quantity-comparator',
  templateUrl: './quantity-comparator.component.html',
  styleUrls: ['./quantity-comparator.component.scss'],
})
export class QuantityComparatorComponent {
  @Input()
  value: number;

  @Output()
  quantityValue = new EventEmitter<number>();

  onValueChange(value: number) {
    this.quantityValue.emit(value);
  }
}
