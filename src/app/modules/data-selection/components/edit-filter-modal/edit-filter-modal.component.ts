import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../services/DataSelectionProfileProvider.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileCodeFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { DataSelectionProviderService } from '../../services/DataSelectionProvider.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { take } from 'rxjs';

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
    private dataSelectionProfileProviderService: DataSelectionProfileProviderService,
    private service: DataSelectionProviderService
  ) {}

  public ngOnInit(): void {
    this.profile = this.dataSelectionProfileProviderService.getDataSelectionProfileByUID(this.data);
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

  /**
   * This function is being executed despite not being called implizit
   *
   * @param existingFilter
   */
  public setProfileCodeFilter(existingFilter: ProfileCodeFilter) {
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
      result
    );
  }

  public saveDataSelection() {
    const profile = this.dataSelectionProfileProviderService.getDataSelectionProfileByUID(this.data);

    const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(profile);
    this.dataSelectionProfileProviderService.setDataSelectionProfileByUID(
      profile.getId(),
      dataSelectionProfile
    );
    this.setDataSelectionProvider(dataSelectionProfile);
    this.dialogRef.close();
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfileProfile) {
    this.service.setElementInDataSelectionMap('1', newProfile);
  }
}
