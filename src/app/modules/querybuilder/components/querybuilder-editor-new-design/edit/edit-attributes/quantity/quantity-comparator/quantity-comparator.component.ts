import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'num-quantity-comparator',
  templateUrl: './quantity-comparator.component.html',
  styleUrls: ['./quantity-comparator.component.scss'],
})
export class QuantityComparatorComponent {
  @Output()
  quantityValue = new EventEmitter<number>();

  onValueChange(value: number) {
    this.quantityValue.emit(value);
  }
}
