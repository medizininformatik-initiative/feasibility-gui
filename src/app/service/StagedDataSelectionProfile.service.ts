import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ActiveDataSelectionService } from './Provider/ActiveDataSelection.service';
import { CreateSelectedReferenceService } from './CreateSelectedReference.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProfileCloner } from '../model/Utilities/DataSelecionCloner/DataSelectionProfileCloner';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';

@Injectable({
  providedIn: 'root',
})
export class StagedProfileService {
  private stagedProfile: DataSelectionProfile | null = null;

  constructor(
    private activeDataSelectionService: ActiveDataSelectionService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private createSelectedReferenceService: CreateSelectedReferenceService,
    private profileProviderService: ProfileProviderService
  ) {}

  /**
   * Stages a profile for temporary changes.
   * @param profile - The profile to stage.
   */
  public initialize(profile: DataSelectionProfile): void {
    this.stagedProfile = DataSelectionProfileCloner.deepCopyProfile(profile);
    console.log('Staged profile:', this.stagedProfile);
  }

  public getStagedProfile(): DataSelectionProfile | null {
    return this.stagedProfile;
  }

  /**
   * Updates the selected basic fields in the staged profile.
   * @param selectedBasicFields - The updated selected basic fields.
   */
  public updateSelectedBasicFields(selectedBasicFields: SelectedBasicField[]): void {
    if (this.stagedProfile) {
      this.stagedProfile.getProfileFields().setSelectedBasicFields(selectedBasicFields);
    } else {
      console.warn('No profile is staged. Please stage a profile before updating fields.');
    }
  }

  /**
   * Updates the filters in the staged profile.
   * @param filters - The updated filters.
   */
  public updateFilters(filters: AbstractProfileFilter[]): void {
    if (this.stagedProfile) {
      this.stagedProfile.setFilters(filters);
    } else {
      console.warn('No profile is staged. Please stage a profile before updating filters.');
    }
  }

  private updateSelectedReferenceFields(): Observable<void> {
    if (!this.stagedProfile) {
      console.warn('No profile is staged. Cannot update reference fields.');
      return of();
    }
    return this.createSelectedReferenceService.getSelectedReferenceFields(this.stagedProfile).pipe(
      map((selectedReferenceFields) => {
        const existingFields = this.stagedProfile.getProfileFields().getSelectedReferenceFields();
        const mergedFields = [...existingFields, ...selectedReferenceFields];
        this.stagedProfile.getProfileFields().setSelectedReferenceFields(mergedFields);
      })
    );
  }

  public buildProfile(): Observable<DataSelectionProfile | null> {
    if (!this.stagedProfile) {
      console.warn('No profile is staged. Please stage a profile before building.');
      return of(null);
    }
    return this.updateSelectedReferenceFields().pipe(
      map(() => {
        const finalizedProfile = this.stagedProfile;
        this.setProvider(finalizedProfile);
        //this.stagedProfile = null;
        return finalizedProfile;
      })
    );
  }

  private setProvider(profile: DataSelectionProfile): void {
    this.profileProviderService.setProfileById(profile.getId(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, profile);
  }
}
