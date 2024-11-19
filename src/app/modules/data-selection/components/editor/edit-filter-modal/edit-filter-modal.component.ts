import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../../services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';

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

  profile: DataSelectionProfileProfile;

  profileCodeFilters: ProfileTokenFilter[] = [];

  profileTimeFilters: ProfileTimeRestrictionFilter[] = [];

  dummyArray: ProfileTimeRestrictionFilter[] = [];

  dummyArrayCode: ProfileTokenFilter[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public url: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProfileProviderService: DataSelectionProfileProviderService,
    private service: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  public ngOnInit(): void {
    this.profile = this.dataSelectionProfileProviderService.getDataSelectionProfileByUrl(this.url);
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
    const profile = this.dataSelectionProfileProviderService.getDataSelectionProfileByUrl(this.url);

    const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(profile);
    dataSelectionProfile.getReference().setIsReferenceSet(false);
    this.dataSelectionProfileProviderService.setDataSelectionProfileByUrl(
      profile.getUrl(),
      dataSelectionProfile
    );
    this.setDataSelectionProvider(dataSelectionProfile);
    this.dialogRef.close();
  }

  private createInstanceOfDataSelectionProfile(profile: DataSelectionProfileProfile) {
    const result: AbstractProfileFilter[] = [];
    result.push(...this.dummyArrayCode);
    if (this.dummyArray.length > 0) {
      result.push(...this.dummyArray);
    } else {
      result.push(...this.profileTimeFilters);
    }
    return new DataSelectionProfileProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      result,
      profile.getReference()
    );
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfileProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.service.setProfileInDataSelection(dataSelectionId, newProfile);
  }
}
