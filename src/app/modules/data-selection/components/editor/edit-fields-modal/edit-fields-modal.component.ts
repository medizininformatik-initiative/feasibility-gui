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
import { first, map } from 'rxjs';

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
    @Inject(MAT_DIALOG_DATA) public url: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProvider: DataSelectionProfileProviderService,
    private service: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService
  ) {}

  ngOnInit() {
    const dataSelectionProfile = this.dataSelectionProvider.getDataSelectionProfileByUrl(this.url);
    this.profileName = dataSelectionProfile.getDisplay();
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(
      dataSelectionProfile.getFields()
    );

    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(
        first(), // Automatically complete the observable after fetching
        map((profileFields) => {
          this.setInitialArrayOfSelectedFields(profileFields); // Initialize selected fields
          this.tree = FieldsTreeAdapter.fromTree(profileFields); // Build the tree
        })
      )
      .subscribe();

    this.selectedDataSelectionProfileFieldsService.getSelectedFields().subscribe((fields) => {
      this.arrayOfSelectedFields = fields;
    });
  }

  private setInitialArrayOfSelectedFields(fields: ProfileFields[]) {
    this.setSelectedChildrenFields(fields);
  }

  public setSelectedChildrenFields(fields: ProfileFields[]) {
    fields.forEach((field) => {
      if (field.getIsSelected() || field.getIsRequired()) {
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
    this.selectedDataSelectionProfileFieldsService.updateField(field);
  }

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.selectedDataSelectionProfileFieldsService.getSelectedIds().indexOf(node.getId());
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    node.setIsSelected(true);
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
  }

  private removeNodeFromSelectedFields(node: ProfileFields): void {
    if (!node.getIsRequired()) {
      node.setIsSelected(false);
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);
    }
  }

  public removeNodeFromSelectedFields2(node: ProfileFields): void {
    if (!node.getIsRequired()) {
      node.setIsSelected(false);
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);

      this.selectedDataSelectionProfileFieldsService
        .getDeepCopyProfileFields()
        .pipe(
          first(),
          map((profileFields: ProfileFields[]) => {
            this.tree = FieldsTreeAdapter.fromTree(profileFields);
          })
        )
        .subscribe();
    }
  }

  public isFieldRequired(field: ProfileFields) {
    return !field.getIsRequired();
  }

  public saveFields() {
    const profile = this.dataSelectionProvider.getDataSelectionProfileByUrl(this.url);
    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(first())
      .subscribe((profileFields) => {
        const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(
          profile,
          profileFields
        );
        this.dataSelectionProvider.setDataSelectionProfileByUrl(
          profile.getUrl(),
          dataSelectionProfile
        );
        this.setDataSelectionProvider(dataSelectionProfile);
        this.dialogRef.close();
      });
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfileProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.service.setProfileInDataSelection(dataSelectionId, newProfile);
  }

  private createInstanceOfDataSelectionProfile(
    profile: DataSelectionProfileProfile,
    profileFields: ProfileFields[]
  ) {
    return new DataSelectionProfileProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profileFields,
      profile.getFilters()
    );
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
