import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

@Component({
  selector: 'num-before-filter',
  templateUrl: './before-filter.component.html',
  styleUrls: ['./before-filter.component.scss'],
})
export class BeforeFilterComponent implements OnInit {
  @Input()
  timeRestrictionType: TimeRestrictionType;

  @Output()
  selectedDateChanged = new EventEmitter<string>();

  @Input()
  selectedDate = '';

  ngOnInit() {}

  public onBeforeDateChange(selectedDate: string) {
    this.selectedDateChanged.emit(selectedDate);
  }
}
