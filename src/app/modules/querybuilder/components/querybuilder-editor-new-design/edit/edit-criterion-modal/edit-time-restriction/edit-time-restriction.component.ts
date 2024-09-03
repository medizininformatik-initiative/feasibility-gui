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

  afterDate: string;

  beforeDate: string;

  ngOnInit() {
    this.afterDate = this.timeRestriction.getAfterDate();
    this.beforeDate = this.timeRestriction.getBeforeDate();
    this.selectedTimeRestrictionType = this.timeRestriction.getType();
  }

  onTimeRestrictionOptionChange(timeRestriction: string) {
    this.selectedTimeRestrictionType =
      TimeRestrictionType[timeRestriction as keyof typeof TimeRestrictionType];
    this.emitSelectedTimeRestriction();
  }

  onTimeRestrictionDateChange(selectedAfterDate: string) {
    this.afterDate = selectedAfterDate;
    this.emitSelectedTimeRestriction();
  }

  emitSelectedTimeRestriction() {
    if (this.afterDate) {
      switch (this.selectedTimeRestrictionType) {
        case TimeRestrictionType.AFTER: {
          const afterFilter = new AfterFilter(this.afterDate);
          return this.timeRestrictionChanged.emit(afterFilter);
        }
        case TimeRestrictionType.AT: {
          const atFilter = new AtFilter(this.afterDate, this.afterDate);
          return this.timeRestrictionChanged.emit(atFilter);
        }
        case TimeRestrictionType.BEFORE: {
          const beforeFilter = new BeforeFilter(this.afterDate);
          return this.timeRestrictionChanged.emit(beforeFilter);
        }
      }
    }
  }

  /**
   * @todo Adjust the corresponding component to ensure that only the selected dates are emitted.
   *       The actual object should be instantiated here in this component.
   * @param betweenFilter The filter to apply for the date range.
   * @returns The filtered result.
   */
  public updateTimeRestrictionBetweenFilter(betweenFilter: BetweenFilter) {
    return this.timeRestrictionChanged.emit(betweenFilter);
  }
}
