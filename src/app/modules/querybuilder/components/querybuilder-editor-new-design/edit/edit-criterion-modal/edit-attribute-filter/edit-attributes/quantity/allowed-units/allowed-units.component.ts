import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { QuantityUnit } from 'src/app/model/QuantityUnit';

@Component({
  selector: 'num-allowed-units',
  templateUrl: './allowed-units.component.html',
  styleUrls: ['./allowed-units.component.scss'],
})
export class AllowedUnitsComponent implements OnInit, OnChanges {
  @Input()
  allowedUnits: QuantityUnit[] = [];

  @Input()
  selectedUnit: QuantityUnit;

  @Output()
  selectionChange = new EventEmitter<QuantityUnit>();

  selectedUnitDisplay: string;

  ngOnInit() {
    this.updateSelectedUnit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allowedUnits || changes.selectedUnit) {
      this.updateSelectedUnit();
    }
  }

  updateSelectedUnit() {
    if (this.selectedUnit && this.allowedUnits.some((unit) => unit === this.selectedUnit)) {
      this.selectedUnitDisplay = this.selectedUnit.getDisplay();
    } else if (this.allowedUnits.length > 0) {
      this.selectedUnit = this.allowedUnits[0];
      this.selectedUnitDisplay = this.selectedUnit.getDisplay();
    } else {
      this.selectedUnitDisplay = null;
    }
  }

  onSelectionChange(selectedValue: string) {
    const selectedUnit = this.allowedUnits.find((unit) => unit.getDisplay() === selectedValue);
    if (selectedUnit) {
      this.selectedUnit = selectedUnit;
      this.selectedUnitDisplay = selectedUnit.getDisplay();
      this.selectionChange.emit(this.selectedUnit);
    }
  }
}
