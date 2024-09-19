import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

@Component({
  selector: 'num-timerestriction-type-selector',
  templateUrl: './timerestriction-type-selector.component.html',
  styleUrls: ['./timerestriction-type-selector.component.scss'],
})
export class TimerestrictionTypeSelectorComponent {
  @Input()
  type: TimeRestrictionType;

  timeRestrictionOptions: string[] = Object.values(TimeRestrictionType);

  @Output()
  timeRestrictionTypeChanged = new EventEmitter<TimeRestrictionType>();

  public onTimeRestrictionOptionChange(timeRestriction: string) {
    this.type = TimeRestrictionType[timeRestriction as keyof typeof TimeRestrictionType];
    this.timeRestrictionTypeChanged.emit(this.type);
  }
}
