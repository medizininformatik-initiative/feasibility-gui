import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-quantity-comparator',
  templateUrl: './quantity-comparator.component.html',
  styleUrls: ['./quantity-comparator.component.scss'],
})
export class QuantityComparatorComponent implements OnInit {
  @Input()
  value: number;

  @Output()
  quantityValue = new EventEmitter<number>();

  ngOnInit() {}

  public onValueChange(value: number) {
    this.quantityValue.emit(value);
  }
}
