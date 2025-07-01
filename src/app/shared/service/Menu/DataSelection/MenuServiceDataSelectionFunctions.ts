import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { v4 as uuidv4 } from 'uuid';
import { NavigationHelperService } from '../../../../service/NavigationHelper.service';
import { RemoveReferenceService } from '../../../../service/RemoveReference.service';
import { StagedProfileService } from '../../../../service/StagedDataSelectionProfile.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelectionFunctions {
  constructor(
    private profileProvider: ProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private navigationHelperService: NavigationHelperService,
    private removeReferenceService: RemoveReferenceService,
    private stagedProfileService: StagedProfileService
  ) {}

  public redirectToDataSelectionEditPage(id: string) {
    this.stagedProfileService.initialize(id);
    this.navigationHelperService.navigateToEditProfile(id);
  }
  /**
   * Wont work as we need a unique id for the DataSelectionProfile
   *
   * @param id
   */
  public cloneDataSelectionObject(url: string) {
    const profile = this.profileProvider.getProfileById(url);
    const copiedProfile = new DataSelectionProfile(
      uuidv4(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getProfileFields(),
      profile.getFilters(),
      profile.getReference(),
      profile.getLabel()
    );
    this.profileProvider.setProfileById(copiedProfile.getId(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.setProfileInDataSelection(dataSelectionId, copiedProfile);
  }

  public deleteDataSelectionObject(id: string) {
    this.removeReferenceService.delete(id);

    /*const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.removeProfileFromDataSelection(dataSelectionId, id);
    this.profileProvider.removeProfileById(id);*/
  }
}
