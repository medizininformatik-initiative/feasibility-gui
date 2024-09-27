import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

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

  public emitProfileCode(selectedConcepts: TerminologyCode[]): void {
    const updatedFilter = new ProfileTokenFilter(
      this.profileCodeFilter.getName(),
      this.profileCodeFilter.getType(),
      this.profileCodeFilter.getValueSetUrls(),
      selectedConcepts
    );
    this.changedProfileCode.emit(updatedFilter);
  }
}
