import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { DataSelectionProfileProviderService } from '../../../services/DataSelectionProfileProvider.service';

export class EnterDataSelectionProfileProfileComponentData {
  url: string;
}

@Component({
  selector: 'num-edit-fields-modal',
  templateUrl: './edit-fields-modal.component.html',
  styleUrls: ['./edit-fields-modal.component.scss'],
  providers: [SelectedDataSelectionProfileFieldsService],
})
export class EditFieldsModalComponent implements OnInit {
  dataSelectionProfileProfileNode: ProfileFields[];

  tree: TreeNode[];
  profileName: DisplayData;

  removeFieldDisabled = false;
  arrayOfSelectedFields: ProfileFields[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProvider: DataSelectionProfileProviderService,
    private service: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService
  ) {}

  ngOnInit() {
    const dataSelectionProfile = this.dataSelectionProvider.getDataSelectionProfileByUID(this.data);
    this.profileName = dataSelectionProfile.getDisplay();
    this.dataSelectionProfileProfileNode = dataSelectionProfile.getFields();
    this.setInitialArrayOfSelectedFields(dataSelectionProfile.getFields());
    this.tree = FieldsTreeAdapter.fromTree(this.dataSelectionProfileProfileNode);

    this.selectedDataSelectionProfileFieldsService.getSelectedFields().subscribe((fields) => {
      this.arrayOfSelectedFields = fields;
    });
  }

  private setInitialArrayOfSelectedFields(fields: ProfileFields[]) {
    this.setSelectedChildrenFields(fields);
  }

  public setSelectedChildrenFields(fields: ProfileFields[]) {
    fields.forEach((field) => {
      if (field.getIsSelected() || field.getIsRequired() || field.getRecommended()) {
        this.selectedDataSelectionProfileFieldsService.addToSelection(field);
      }
      this.setSelectedChildrenFields(field.getChildren());
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
    field.setMustHave(!field.getMustHave());
  }

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.selectedDataSelectionProfileFieldsService.getSelectedIds().indexOf(node.getId());
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
    node.setRecommended(false);
    node.setIsSelected(true);
  }

  private removeNodeFromSelectedFields(node: ProfileFields): void {
    if (!node.getIsRequired()) {
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);
      node.setIsSelected(false);
      const fieldToUpdate = this.dataSelectionProfileProfileNode.find(
        (field) => field.getId() === node.getId()
      );
      if (fieldToUpdate) {
        fieldToUpdate.setIsSelected(false);
      }
      this.tree = FieldsTreeAdapter.fromTree(this.dataSelectionProfileProfileNode);
    }
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
