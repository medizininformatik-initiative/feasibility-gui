import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { DataSelectionProfileProviderService } from '../../services/DataSelectionProfileProvider.service';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

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

  arrayOfSelectedFields: ProfileFields[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProvider: DataSelectionProfileProviderService
  ) {}

  ngOnInit() {
    const dataSelectionProfile = this.dataSelectionProvider.getDataSelectionProfileByUID(this.data);
    this.dataSelectionProfileProfileNode = dataSelectionProfile.getFields();
    this.setInitialArrayOfSelectedFields(dataSelectionProfile.getFields());
    this.tree = FieldsTreeAdapter.fromTree(this.dataSelectionProfileProfileNode);
  }

  private setInitialArrayOfSelectedFields(fields: ProfileFields[]) {
    fields.forEach((field) => {
      if (field.getIsSelected()) {
        this.arrayOfSelectedFields.push(field);
      }
    });
  }

  public setSelectedFieldElement(element) {
    const node = this.getNodeFromElement(element);
    const index = this.getIndexInSelectedFields(node);
    if (this.isNodeSelected(index)) {
      this.removeNodeFromSelectedFields(index);
    } else {
      this.setFieldAsSeleced(node);
      this.addNodeToSelectedFields(node);
    }
  }

  public setFieldAsRequired(field: ProfileFields) {
    field.setIsRequired(!field.getIsRequired());
  }

  private getNodeFromElement(element): ProfileFields {
    return element.originalEntry;
  }

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.arrayOfSelectedFields.findIndex((field) => node.getId() === field.getId());
  }

  private isNodeSelected(index: number): boolean {
    return index !== -1;
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    this.arrayOfSelectedFields.push(node);
  }

  private setFieldAsSeleced(field: ProfileFields) {
    field.setIsSelected(!field.getIsSelected());
  }

  private removeNodeFromSelectedFields(index: number): void {
    this.arrayOfSelectedFields.splice(index, 1);
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
    this.dialogRef.close();
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
