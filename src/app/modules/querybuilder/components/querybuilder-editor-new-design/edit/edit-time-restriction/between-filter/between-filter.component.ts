import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';

import { MAT_DATE_FORMATS } from '@angular/material/core';

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
  selector: 'num-between-filter',
  templateUrl: './between-filter.component.html',
  styleUrls: ['./between-filter.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class BetweenFilterComponent implements OnChanges {
  @Input() betweenFilter: BetweenFilter;
  beforeDate: string;
  afterDate: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.betweenFilter && this.betweenFilter) {
      this.beforeDate = this.betweenFilter.getBeforeDate();
      this.afterDate = this.betweenFilter.getAfterDate();
    }
  }

  onBeforeDateChange(event: any) {
    this.beforeDate = event.value;
    this.betweenFilter.setBeforeDate(this.beforeDate);
  }

  onAfterDateChange(event: any) {
    this.afterDate = event.value;
    this.betweenFilter.setAfterDate(this.afterDate);
  }
}
