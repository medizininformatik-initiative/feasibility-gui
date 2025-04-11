import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { EditDataSelectionFields } from 'src/app/service/DataSelection/ModalWindowServices/EditDataSelectionFields.service';
import { EditDataSelectionFilter } from 'src/app/service/DataSelection/ModalWindowServices/EditDataSelectionFilter.service';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelectionFunctions {
  constructor(
    private dataSelectionFieldsModalService: EditDataSelectionFields,
    private dataSelectionFilterModalService: EditDataSelectionFilter,
    private profileProvider: ProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  public openDataSelectionFieldModal(id: string) {
    this.dataSelectionFieldsModalService.ediDataSelectionFields(id);
  }

  public openDataSelectionFilterModal(url: string) {
    this.dataSelectionFilterModalService.ediDataSelectionFilter(url);
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
      profile.getReference()
    );
    this.profileProvider.setProfileById(copiedProfile.getId(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.setProfileInDataSelection(dataSelectionId, copiedProfile);
  }

  public deleteDataSelectionObject(id: string) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.removeProfileFromDataSelection(dataSelectionId, id);
    this.profileProvider.removeProfileById(id);
  }
}
