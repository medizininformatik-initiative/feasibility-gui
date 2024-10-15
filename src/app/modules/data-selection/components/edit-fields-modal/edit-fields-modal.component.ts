import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { DataSelectionProfileProviderService } from '../../services/DataSelectionProfileProvider.service';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProviderService } from '../../services/DataSelectionProvider.service';
import { ActiveDataSelectionService } from '../../../../service/Provider/ActiveDataSelection.service';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { TranslateService } from '@ngx-translate/core';

export class EnterDataSelectionProfileProfileComponentData {
  url: string;
}

@Component({
  selector: 'num-edit-fields-modal',
  templateUrl: './edit-fields-modal.component.html',
  styleUrls: ['./edit-fields-modal.component.scss'],
})
export class EditFieldsModalComponent implements OnInit {
  dataSelectionProfileProfileNode: ProfileFields[];

  tree: TreeNode[];
  profileName: string;

  arrayOfSelectedFields: ProfileFields[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProvider: DataSelectionProfileProviderService,
    private service: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const dataSelectionProfile = this.dataSelectionProvider.getDataSelectionProfileByUID(this.data);
    const display = dataSelectionProfile.getDisplay();
    this.profileName = new DisplayData(display.original, display.translations).getTranslation(
      this.translate.currentLang
    );
    this.dataSelectionProfileProfileNode = dataSelectionProfile.getFields();
    this.setInitialArrayOfSelectedFields(dataSelectionProfile.getFields());
    this.tree = FieldsTreeAdapter.fromTree(
      this.dataSelectionProfileProfileNode,
      this.translate.currentLang
    );
    this.selectedDataSelectionProfileFieldsService.getSelectedFields().subscribe((fields) => {
      this.arrayOfSelectedFields = fields;
    });
  }

  getDisplay(display) {
    return new DisplayData(display.original, display.translations).getTranslation(
      this.translate.currentLang
    );
  }

  private setInitialArrayOfSelectedFields(fields: ProfileFields[]) {
    fields.forEach((field) => {
      if (field.getIsSelected()) {
        this.selectedDataSelectionProfileFieldsService.addToSelection(field);
      }
    });
  }

  public setSelectedFieldElement(element) {
    const node = element.originalEntry;
    const index = this.getIndexInSelectedFields(node);
    if (index !== -1) {
      this.removeNodeFromSelectedFields(node);
    } else {
      this.addNodeToSelectedFields(node);
    }
  }

  public setFieldAsRequired(field: ProfileFields) {
    field.setIsRequired(!field.getIsRequired());
  }

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.selectedDataSelectionProfileFieldsService.getSelectedIds().indexOf(node.getId());
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
    node.setIsSelected(true);
  }

  private removeNodeFromSelectedFields(node: ProfileFields): void {
    this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);
    node.setIsSelected(false);
    const fieldToUpdate = this.dataSelectionProfileProfileNode.find(
      (field) => field.getId() === node.getId()
    );
    if (fieldToUpdate) {
      fieldToUpdate.setIsSelected(false);
    }
    this.tree = FieldsTreeAdapter.fromTree(
      this.dataSelectionProfileProfileNode,
      this.translate.currentLang
    );
  }

  public saveFields() {
    const profile = this.dataSelectionProvider.getDataSelectionProfileByUID(this.data);

    const fields = profile.getFields();
    fields.forEach((field) => {
      const foundElement = this.arrayOfSelectedFields.find(
        (selectedField) => field.getId() === selectedField.getId()
      );
      field.setIsSelected(!!foundElement);
    });
    const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(profile);
    this.dataSelectionProvider.setDataSelectionProfileByUID(profile.getId(), dataSelectionProfile);
    this.setDataSelectionProvider(dataSelectionProfile);
    this.dialogRef.close();
  }
  private setDataSelectionProvider(newProfile: DataSelectionProfileProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.service.setProfileInDataSelection(dataSelectionId, newProfile);
  }

  private createInstanceOfDataSelectionProfile(profile: DataSelectionProfileProfile) {
    return new DataSelectionProfileProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      profile.getFilters()
    );
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
