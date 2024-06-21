import { Component } from '@angular/core';
import { FilterTypes } from 'src/app/model/FilterTypes';

@Component({
  selector: 'num-quantity-range',
  templateUrl: './quantity-range.component.html',
  styleUrls: ['./quantity-range.component.scss'],
})
export class QuantityRangeComponent {
  FilterTypes: typeof FilterTypes = FilterTypes;
}
