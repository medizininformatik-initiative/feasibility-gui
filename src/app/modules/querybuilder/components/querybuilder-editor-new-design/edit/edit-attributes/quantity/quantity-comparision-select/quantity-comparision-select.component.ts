import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';

@Component({
  selector: 'num-quantity-comparision-select',
  templateUrl: './quantity-comparision-select.component.html',
  styleUrls: ['./quantity-comparision-select.component.scss'],
})
export class QuantityComparisionSelectComponent {
  quantityFilterOptionsArray: string[] = Object.values(QuantityComparisonOption);

  @Input()
  existingOption: QuantityComparisonOption = QuantityComparisonOption.NONE;

  @Output()
  selectedOption = new EventEmitter<string>();

  selectQuantityFilterOption(option: string) {
    this.selectedOption.emit(option);
  }
}
