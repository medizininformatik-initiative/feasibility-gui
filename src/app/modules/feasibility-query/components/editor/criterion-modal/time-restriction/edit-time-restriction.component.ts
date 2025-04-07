import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { TimeRestrictionNotSet } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/TimeRestrictionNotSet';

@Component({
  selector: 'num-edit-time-restriction',
  templateUrl: './edit-time-restriction.component.html',
  styleUrls: ['./edit-time-restriction.component.scss'],
})
export class EditTimeRestrictionComponent implements OnInit {
  @Input()
  timeRestriction: AbstractTimeRestriction;

  @Output()
  timeRestrictionChanged = new EventEmitter<AbstractTimeRestriction>();

  selectedTimeRestrictionType: TimeRestrictionType;

  ngOnInit() {
    if (this.timeRestriction) {
      this.selectedTimeRestrictionType = this.timeRestriction.getType();
    }
  }

  public onTimeRestrictionOptionChange(timeRestriction: string) {
    this.selectedTimeRestrictionType =
      TimeRestrictionType[timeRestriction as keyof typeof TimeRestrictionType];

    if (this.selectedTimeRestrictionType === TimeRestrictionType.NONE) {
      this.timeRestrictionChanged.emit(new TimeRestrictionNotSet());
    }
  }

  public emitSelectedTimeRestrictionInstance(timeRestrictionInstance: AbstractTimeRestriction) {
    return this.timeRestrictionChanged.emit(timeRestrictionInstance);
  }
}
