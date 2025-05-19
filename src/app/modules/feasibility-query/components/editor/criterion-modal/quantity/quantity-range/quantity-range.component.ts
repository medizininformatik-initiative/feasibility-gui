import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuantityFilterFactoryService } from 'src/app/service/Factory/QuantityFilterFactory.service';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { QuantityNotSet } from '../../../../../../../model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';

@Component({
  selector: 'num-quantity-range',
  templateUrl: './quantity-range.component.html',
  styleUrls: ['./quantity-range.component.scss'],
})
export class QuantityRangeComponent implements OnChanges {
  @Input()
  minValue: number;

  @Input()
  maxValue: number;

  @Input()
  quantityFilterUnit: QuantityUnit;

  @Output()
  quantityRangeInstance: EventEmitter<QuantityRangeFilter | QuantityNotSet> = new EventEmitter();

  displayWarning = false;
  constructor(private quantityFilterFactoryService: QuantityFilterFactoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.minValue || changes.maxValue || changes.quantityFilterUnit) {
      this.emitQuantityRangeFilter();
    }
  }

  public setMaxValue(value: number): void {
    this.maxValue = value;
    this.emitQuantityRangeFilter();
  }

  public setMinValue(value: number): void {
    this.minValue = value;
    this.emitQuantityRangeFilter();
  }

  private emitQuantityRangeFilter(): void {
    if (this.minValue != null && this.maxValue != null && this.quantityFilterUnit) {
      if (this.minValue <= this.maxValue) {
        const quantityRangeFilter = this.quantityFilterFactoryService.createQuantityRangeFilter(
          this.minValue,
          this.maxValue
        );
        this.quantityRangeInstance.emit(quantityRangeFilter);
        this.displayWarning = false;
      } else {
        const emptyFilter = this.quantityFilterFactoryService.createEmptyQuantityFilter();
        this.quantityRangeInstance.emit(emptyFilter);
        this.displayWarning = true;
      }
    }
  }
}
