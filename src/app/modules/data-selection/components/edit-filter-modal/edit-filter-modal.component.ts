import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProviderService } from '../../services/DataSelectionProviderService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { TimeRestrictionChipService } from 'src/app/shared/service/FilterChips/Criterion/TimeRestrictionChipService.service';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { ProfileCodeFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';

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

  profileCodeFilters: ProfileCodeFilter[] = [];

  profileTimeFilters: ProfileTimeRestrictionFilter[] = [];

  dummyArray: ProfileTimeRestrictionFilter[] = [];

  dummyArrayCode: ProfileCodeFilter[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private timeRestrictionFilterChipService: TimeRestrictionChipService,
    private dataSelectionProviderService: DataSelectionProviderService
  ) {}

  public ngOnInit(): void {
    this.profile = this.dataSelectionProviderService.getDataSelectionProfileByUID(this.data);
    this.profile.getFilters().forEach((filter) => {
      this.setInitialFilterType(filter);
    });
  }

  private setInitialFilterType(filter: AbstractProfileFilter): void {
    if (filter.getUiType() === DataSelectionFilterTypes.CODE) {
      this.profileCodeFilters.push(filter as ProfileCodeFilter);
    }
    if (filter.getUiType() === DataSelectionFilterTypes.TIMERESTRICTION) {
      this.profileTimeFilters.push(filter as ProfileTimeRestrictionFilter);
    }
  }

  public setProfileCodeFilter(
    selectedConcepts: TerminologyCode[],
    existingFilter: ProfileCodeFilter
  ) {
    const index = this.dummyArrayCode.findIndex(
      (profile) => profile.getName() === existingFilter.getName()
    );
    if (index !== -1) {
      this.dummyArrayCode[index] = this.createProfileCode(selectedConcepts, existingFilter);
    } else {
      this.dummyArrayCode.push(this.createProfileCode(selectedConcepts, existingFilter));
    }
  }

  private createProfileCode(
    selectedConcepts: TerminologyCode[],
    existingFilter: ProfileCodeFilter
  ) {
    return new ProfileCodeFilter(
      existingFilter.getName(),
      existingFilter.getType(),
      existingFilter.getValueSetUrls(),
      selectedConcepts
    );
  }

  public setTimeRestriction(
    timeRestriction: AbstractTimeRestriction,
    existingFilter: ProfileTimeRestrictionFilter
  ) {
    const index = this.dummyArray.findIndex(
      (profile) => profile.getName() === existingFilter.getName()
    );
    if (index !== -1) {
      this.dummyArray[index] = this.createProfileTimeRestriction(existingFilter, timeRestriction);
    } else {
      this.dummyArray.push(this.createProfileTimeRestriction(existingFilter, timeRestriction));
    }
  }

  private createProfileTimeRestriction(
    foundElement: ProfileTimeRestrictionFilter,
    timeRestriction: AbstractTimeRestriction
  ) {
    return new ProfileTimeRestrictionFilter(
      foundElement.getName(),
      foundElement.getType(),
      timeRestriction
    );
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private createInstanceOfDataSelectionProfile(profile: DataSelectionProfileProfile) {
    const result: AbstractProfileFilter[] = [];
    result.push(...this.dummyArrayCode, ...this.dummyArray);
    return new DataSelectionProfileProfile(
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      result
    );
  }

  public saveDataSelection() {
    const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(this.profile);
    this.dataSelectionProviderService.setDataSelectionProfileByUID(
      dataSelectionProfile.getUrl(),
      dataSelectionProfile
    );
    this.dialogRef.close();
  }
}
