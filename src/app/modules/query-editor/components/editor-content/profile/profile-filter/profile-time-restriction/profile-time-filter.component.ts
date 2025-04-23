import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';

@Component({
  selector: 'num-profile-time-filter',
  templateUrl: './profile-time-filter.component.html',
  styleUrls: ['./profile-time-filter.component.scss'],
})
export class ProfileTimeFilterComponent implements OnInit {
  @Input()
  profileTimeRestrictionFilter: ProfileTimeRestrictionFilter;

  @Output()
  changedProfileTimeRestrictionFilter = new EventEmitter<ProfileTimeRestrictionFilter>();

  ngOnInit(): void {}

  public emitProfileTimeRestriction(timeRestriction: AbstractTimeRestriction): void {
    const updatedFilter = new ProfileTimeRestrictionFilter(
      this.profileTimeRestrictionFilter.getName(),
      this.profileTimeRestrictionFilter.getType(),
      timeRestriction
    );
    this.changedProfileTimeRestrictionFilter.emit(updatedFilter);
  }
}
