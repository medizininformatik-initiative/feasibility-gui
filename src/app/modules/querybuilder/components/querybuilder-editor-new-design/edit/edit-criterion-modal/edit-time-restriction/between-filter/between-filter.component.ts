import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class BetweenFilterComponent implements OnChanges, OnInit {
  @Input()
  betweenFilter: BetweenFilter;

  @Output()
  betweenFilterChanged = new EventEmitter<BetweenFilter>();

  beforeDate: string;

  afterDate: string;

  ngOnInit(): void {
    this.beforeDate = this.betweenFilter.getBeforeDate();
    this.afterDate = this.betweenFilter.getAfterDate();
    this.emitInstance();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.betweenFilter && this.betweenFilter) {
      this.beforeDate = this.betweenFilter.getBeforeDate();
      this.afterDate = this.betweenFilter.getAfterDate();
    }
  }

  onBeforeDateChange(event: any) {
    this.beforeDate = event.value;
    this.betweenFilter.setBeforeDate(this.beforeDate);
    this.emitInstance();
  }

  onAfterDateChange(event: any) {
    this.afterDate = event.value;
    this.betweenFilter.setAfterDate(this.afterDate);
    this.emitInstance();
  }

  emitInstance() {
    if (this.beforeDate && this.afterDate) {
      this.betweenFilterChanged.emit(new BetweenFilter(this.afterDate, this.beforeDate));
    }
  }
}
