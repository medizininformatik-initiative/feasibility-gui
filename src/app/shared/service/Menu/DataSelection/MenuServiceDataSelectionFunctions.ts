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

  public openDataSelectionFieldModal(id: string) {
    this.dataSelectionFieldsModalService.ediDataSelectionFields(id);
  }

  public openDataSelectionFilterModal(id: string) {
    this.dataSelectionFilterModalService.ediDataSelectionFilter(id);
  }

  /**
   * Wont work as we need a unique id for the DataSelectionProfileProfile
   *
   * @param id
   */
  public cloneDataSelectionObject(id: string) {
    const profile = this.dataSelectionProfileProvider.getDataSelectionProfileByUID(id);
    const copiedProfile = new DataSelectionProfileProfile(
      uuidv4(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      profile.getFilters()
    );
    this.dataSelectionProfileProvider.setDataSelectionProfileByUID(copiedProfile.getId(), profile);
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.setProfileInDataSelection(dataSelectionId, copiedProfile);
  }

  public deleteDataSelectionObject(id: string) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProvider.removeProfileFromDataSelection(dataSelectionId, id);
    this.dataSelectionProfileProvider.removeDataSelectionProfileByUID(id);
  }
}
