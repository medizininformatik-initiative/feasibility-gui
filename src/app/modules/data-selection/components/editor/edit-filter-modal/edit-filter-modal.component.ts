import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { ProfileProviderService } from '../../../services/ProfileProvider.service';

export class EnterDataSelectionProfileProfileComponentData {
  url: string;
}

@Component({
  selector: 'num-edit-filter-modal',
  templateUrl: './edit-filter-modal.component.html',
  styleUrls: ['./edit-filter-modal.component.scss'],
})
export class EditFilterModalComponent implements OnInit {
  timeRestriction: BetweenFilter;

  profile: DataSelectionProfile;

  profileCodeFilters: ProfileTokenFilter[] = [];

  profileTimeFilters: ProfileTimeRestrictionFilter[] = [];

  dummyArray: ProfileTimeRestrictionFilter[] = [];

  dummyArrayCode: ProfileTokenFilter[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private profileProviderService: ProfileProviderService,
    private service: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.profile = this.profileProviderService.getProfileById(this.id);
    this.profile.getFilters().forEach((filter) => {
      this.setInitialFilterType(filter);
    });
  }

  private setInitialFilterType(filter: AbstractProfileFilter): void {
    if (filter.getUiType() === DataSelectionUIType.CODE) {
      this.profileCodeFilters.push(filter as ProfileTokenFilter);
    }
    if (filter.getUiType() === DataSelectionUIType.TIMERESTRICTION) {
      this.profileTimeFilters.push(filter as ProfileTimeRestrictionFilter);
    }
  }

  /**
   * This function is being executed despite not being called implizit
   *
   * @param existingFilter
   */
  public setProfileCodeFilter(existingFilter: ProfileTokenFilter) {
    const index = this.dummyArrayCode.findIndex(
      (profile) => profile.getName() === existingFilter.getName()
    );
    if (index !== -1) {
      this.dummyArrayCode[index] = existingFilter;
    } else {
      this.dummyArrayCode.push(existingFilter);
    }
  }

  public setTimeRestriction(existingFilter: ProfileTimeRestrictionFilter) {
    const index = this.dummyArray.findIndex(
      (profile) => profile.getName() === existingFilter.getName()
    );
    if (index !== -1) {
      this.dummyArray[index] = existingFilter;
    } else {
      this.dummyArray.push(existingFilter);
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public saveDataSelection() {
    const profile = this.profileProviderService.getProfileById(this.id);

    const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(profile);
    dataSelectionProfile.getReference().setIsReferenceSet(false);
    this.profileProviderService.setProfileById(profile.getId(), dataSelectionProfile);
    this.setDataSelectionProvider(dataSelectionProfile);
    this.dialogRef.close();
  }

  private createInstanceOfDataSelectionProfile(profile: DataSelectionProfile) {
    const result: AbstractProfileFilter[] = [];
    result.push(...this.dummyArrayCode);
    if (this.dummyArray.length > 0) {
      result.push(...this.dummyArray);
    } else {
      result.push(...this.profileTimeFilters);
    }
    return new DataSelectionProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      result,
      profile.getReference(),
      profile.getSelectedFields()
    );
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.service.setProfileInDataSelection(dataSelectionId, newProfile);
  }
}
