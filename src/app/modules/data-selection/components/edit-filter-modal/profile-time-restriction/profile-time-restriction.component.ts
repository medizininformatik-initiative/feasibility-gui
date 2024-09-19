import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';

@Component({
  selector: 'num-profile-time-restriction',
  templateUrl: './profile-time-restriction.component.html',
  styleUrls: ['./profile-time-restriction.component.scss'],
})
export class ProfileTimeRestrictionComponent {
  @Input()
  profileTimeRestrictionFilter: ProfileTimeRestrictionFilter;

  @Output()
  changedProfileTimeRestrictionFilter = new EventEmitter<ProfileTimeRestrictionFilter>();

  public emitProfileTimeRestriction(timeRestriction: AbstractTimeRestriction): void {
    const updatedFilter = new ProfileTimeRestrictionFilter(
      this.profileTimeRestrictionFilter.getName(),
      this.profileTimeRestrictionFilter.getType(),
      timeRestriction
    );
    this.changedProfileTimeRestrictionFilter.emit(updatedFilter);
  }
}
