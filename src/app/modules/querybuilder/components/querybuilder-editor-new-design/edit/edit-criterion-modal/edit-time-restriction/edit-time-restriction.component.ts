import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AfterFilter';
import { AtFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AtFilter';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

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

  timeRestrictionOptions: string[] = Object.values(TimeRestrictionType);

  selectedTimeRestrictionType: TimeRestrictionType;

  selectedDate = '';

  ngOnInit() {
    this.selectedTimeRestrictionType = this.timeRestriction.getType();
  }

  onTimeRestrictionChange(timeRestriction: string) {
    console.log(timeRestriction);
    this.selectedDate = timeRestriction;
    this.setSelectedTimeRestriction();
  }

  setSelectedTimeRestriction() {
    switch (this.selectedTimeRestrictionType) {
      case TimeRestrictionType.AFTER: {
        const afterFilter = new AfterFilter(this.selectedDate);
        return this.timeRestrictionChanged.emit(afterFilter);
      }
      case TimeRestrictionType.AT: {
        const atFilter = new AtFilter(this.selectedDate, this.selectedDate);
        return this.timeRestrictionChanged.emit(atFilter);
      }
      case TimeRestrictionType.BEFORE: {
        const beforeFilter = new BeforeFilter(this.selectedDate);
        return this.timeRestrictionChanged.emit(beforeFilter);
      }
    }
  }

  /**
   * @todo Adjust the corresponding component to ensure that only the selected dates are emitted.
   *       The actual object should be instantiated here in this component.
   * @param betweenFilter The filter to apply for the date range.
   * @returns The filtered result.
   */
  public updateTimeRestrictionBetweenFilter(beweenFilter: BetweenFilter) {
    return this.timeRestrictionChanged.emit(beweenFilter);
  }
}
