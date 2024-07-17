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
    this.updateSelectedUnitDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUnit) {
      this.updateSelectedUnitDisplay();
    }
  }

  updateSelectedUnitDisplay() {
    this.selectedUnitDisplay = this.selectedUnit ? this.selectedUnit.getDisplay() : null;
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
