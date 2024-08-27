import { Injectable } from '@angular/core';
import { DataExtraction } from 'src/app/model/CRTDL/DataExtraction/DataExtraction';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from 'src/app/modules/data-selection/services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { EditDataSelectionFields } from 'src/app/service/DataSelectionService/ModalWindowServices/EditDataSelectionFields.service';
import { EditDataSelectionFilter } from 'src/app/service/DataSelectionService/ModalWindowServices/EditDataSelectionFilter.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelectionFunctions {
  constructor(
    private dataSelectionFieldsModalService: EditDataSelectionFields,
    private dataSelectionFilterModalService: EditDataSelectionFilter,
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService
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
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      profile.getFilters()
    );
    this.dataSelectionProfileProvider.setDataSelectionProfileByUID(copiedProfile.getUrl(), profile);
    this.dataSelectionProvider.setElementInDataSelectionMap('1', copiedProfile);
  }

  public deleteDataSelectionObject(id: string) {
    this.dataSelectionProvider.removeElementFromDataSelectionMap('1', id);
    this.dataSelectionProfileProvider.removeDataSelectionProfileByUID(id);
  }
}
