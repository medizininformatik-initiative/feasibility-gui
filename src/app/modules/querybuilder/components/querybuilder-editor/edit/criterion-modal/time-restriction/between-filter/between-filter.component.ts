import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { TimeRestrictionFactoryService } from 'src/app/service/Factory/TimeRestrictionFactory.service';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-between-filter',
  templateUrl: './between-filter.component.html',
  styleUrls: ['./between-filter.component.scss'],
})
export class BetweenFilterComponent implements OnInit {
  @Input()
  betweenFilter: BetweenFilter;

  @Output()
  betweenFilterChanged = new EventEmitter<BetweenFilter>();

  beforeDate: string;

  afterDate: string;

  constructor(private timeRestrictionFactoryService: TimeRestrictionFactoryService) {}

  ngOnInit(): void {
    this.initializeDates();
    this.emitInstance();
  }

  private initializeDates(): void {
    this.beforeDate = this.betweenFilter.getBeforeDate();
    this.afterDate = this.betweenFilter.getAfterDate();
  }

  public onBeforeDateChange(selectedDate: string) {
    this.beforeDate = selectedDate;
    this.emitInstance();
  }

  public onAfterDateChange(selectedDate: string) {
    this.afterDate = selectedDate;
    this.emitInstance();
  }

  public emitInstance() {
    if (this.beforeDate && this.afterDate) {
      const timeRestrictionFilter = this.timeRestrictionFactoryService.createTimeRestrictionFilter(
        TimeRestrictionType.BETWEEN,
        this.afterDate,
        this.beforeDate
      ) as BetweenFilter;
      this.betweenFilterChanged.emit(timeRestrictionFilter);
    }
  }
}
