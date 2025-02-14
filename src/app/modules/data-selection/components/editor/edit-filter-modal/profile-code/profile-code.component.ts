import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'num-profile-code',
  templateUrl: './profile-code.component.html',
  styleUrls: ['./profile-code.component.scss'],
})
export class ProfileCodeComponent {
  @Input()
  profileCodeFilter: ProfileTokenFilter;

  @Output()
  changedProfileCode = new EventEmitter<ProfileTokenFilter>();

  public emitProfileCode(selectedConcepts: Concept[]): void {
    const updatedFilter = new ProfileTokenFilter(
      uuidv4(),
      this.profileCodeFilter.getName(),
      this.profileCodeFilter.getType(),
      this.profileCodeFilter.getValueSetUrls(),
      selectedConcepts
    );
    this.changedProfileCode.emit(updatedFilter);
  }
}
