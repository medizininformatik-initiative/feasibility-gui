import { Injectable } from '@angular/core';
import { EditDataSelectionFields } from 'src/app/service/DataSelectionService/ModalWindowServices/EditDataSelectionFields.service';
import { EditDataSelectionFilter } from 'src/app/service/DataSelectionService/ModalWindowServices/EditDataSelectionFilter.service';

@Injectable({
  providedIn: 'root',
})
export class MenuServiceDataSelectionFunctions {
  constructor(
    private dataSelectionFieldsModalService: EditDataSelectionFields,
    private dataSelectionFilterModalService: EditDataSelectionFilter
  ) {}

  public openDataSelectionFieldModal(id: string) {
    this.dataSelectionFieldsModalService.ediDataSelectionFields(id);
  }

  public openDataSelectionFilterModal(id: string) {
    this.dataSelectionFilterModalService.ediDataSelectionFilter(id);
  }

  public cloneDataSelectionObject(id: string) {}

  public deleteDataSelectionObject(id: string) {}
}
