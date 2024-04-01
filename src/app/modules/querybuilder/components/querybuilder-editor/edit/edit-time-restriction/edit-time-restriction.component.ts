import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {
  TimeRestriction,
  TimeRestrictionType,
} from 'src/app/model/FeasibilityQuery/TimeRestriction';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'num-edit-time-restriction',
  templateUrl: './edit-time-restriction.component.html',
  styleUrls: ['./edit-time-restriction.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class EditTimeRestrictionComponent implements OnInit, AfterViewInit {
  @Input()
  timeRestriction: TimeRestriction;

  @Output()
  doResetTimeRestriction = new EventEmitter<boolean>();

  timeRestrictionOptions = Object.keys(TimeRestrictionType);
  timeRestrictionType: typeof TimeRestrictionType = TimeRestrictionType;
  disableAnimation = true;
  disableReset = true;

  constructor() {}

  ngOnInit(): void {}

  // Workaround for angular component issue #13870
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => (this.disableAnimation = false));
    if ((this.timeRestriction?.minDate || this.timeRestriction?.maxDate) !== undefined) {
      this.disableReset = false;
    }
  }

  resetDate() {
    if ((this.timeRestriction.minDate || this.timeRestriction.maxDate) !== undefined) {
      this.disableReset = false;
      this.timeRestriction = new TimeRestriction();
      this.doResetTimeRestriction.emit();
    }
    this.disableReset = true;
  }
}
