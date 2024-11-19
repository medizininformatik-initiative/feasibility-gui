import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { EditDataSelectionFields } from 'src/app/service/DataSelection/ModalWindowServices/EditDataSelectionFields.service';
import { EditDataSelectionFilter } from 'src/app/service/DataSelection/ModalWindowServices/EditDataSelectionFilter.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelectionFunctions {
  constructor(
    private dataSelectionFieldsModalService: EditDataSelectionFields,
    private dataSelectionFilterModalService: EditDataSelectionFilter,
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  public openDataSelectionFieldModal(url: string) {
    this.dataSelectionFieldsModalService.ediDataSelectionFields(url);
  }

  public openDataSelectionFilterModal(url: string) {
    this.dataSelectionFilterModalService.ediDataSelectionFilter(url);
  }

  /**
   * Wont work as we need a unique id for the DataSelectionProfileProfile
   *
   * @param id
   */
  public cloneDataSelectionObject(url: string) {
    const profile = this.dataSelectionProfileProvider.getDataSelectionProfileByUrl(url);
    const copiedProfile = new DataSelectionProfileProfile(
      uuidv4(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      profile.getFilters(),
      profile.getReference()
    );
    this.dataSelectionProfileProvider.setDataSelectionProfileByUrl(copiedProfile.getUrl(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.setProfileInDataSelection(dataSelectionId, copiedProfile);
  }

  public deleteDataSelectionObject(url: string) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.removeProfileFromDataSelection(dataSelectionId, url);
    this.dataSelectionProfileProvider.removeDataSelectionProfileByUrl(url);
  }
}
