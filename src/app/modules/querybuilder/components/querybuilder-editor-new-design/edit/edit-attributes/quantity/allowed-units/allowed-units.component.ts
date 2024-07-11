import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuantityUnit } from 'src/app/model/QuantityUnit';

@Component({
  selector: 'num-allowed-units',
  templateUrl: './allowed-units.component.html',
  styleUrls: ['./allowed-units.component.scss'],
})
export class AllowedUnitsComponent implements OnInit {
  @Input()
  allowedUnits: QuantityUnit[] = [];

  @Output()
  selectionChange = new EventEmitter<QuantityUnit>();

  ngOnInit() {}

  onSelectionChange(selectedValue: string) {
    const selectedIndex = this.allowedUnits.findIndex((unit) => unit.getDisplay() === selectedValue);
    if (selectedIndex > -1) {
      this.selectionChange.emit(this.allowedUnits[selectedIndex]);
    }
  }
}
