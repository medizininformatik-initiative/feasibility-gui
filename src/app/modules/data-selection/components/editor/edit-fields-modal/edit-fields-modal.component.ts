import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/FieldTreeAdapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { first, map, of, switchMap } from 'rxjs';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { ProfileProviderService } from '../../../services/ProfileProvider.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';

export class EnterDataSelectionProfileProfileComponentData {
  id: string;
}

@Component({
  selector: 'num-edit-fields-modal',
  templateUrl: './edit-fields-modal.component.html',
  styleUrls: ['./edit-fields-modal.component.scss'],
  providers: [SelectedDataSelectionProfileFieldsService],
})
export class EditFieldsModalComponent implements OnInit {
  dataSelectionProfileProfileNode: BasicField[];
  tree: TreeNode[];
  profileName: Display;

  removeFieldDisabled = false;
  arrayOfSelectedFields: SelectedBasicField[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private profileProviderService: ProfileProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService
  ) {}

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    const dataSelectionProfile = this.profileProviderService.getProfileById(this.id);
    this.profileName = dataSelectionProfile.getDisplay();
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(
      dataSelectionProfile.getProfileFields().getFieldTree()
    );

    /* this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(
        first(), // Automatically complete the observable after fetching
        map((profileFields) => {
          this.setInitialArrayOfSelectedFields(profileFields); // Initialize selected fields
          this.tree = FieldsTreeAdapter.fromTree(profileFields); // Build the tree
        })
      )
      .subscribe(); */

    this.selectedDataSelectionProfileFieldsService.getSelectedFields().subscribe((fields) => {
      this.arrayOfSelectedFields = fields;
    });
  }

  private setInitialArrayOfSelectedFields(fields: SelectedBasicField[]) {
    this.setSelectedChildrenFields(fields);
  }

  public setSelectedChildrenFields(fields: SelectedBasicField[]) {
    fields.forEach((field) => {
      this.selectedDataSelectionProfileFieldsService.addToSelection(field);
    });
  }

  public setSelectedFieldElement(element) {
    const node: BasicField = element.originalEntry as BasicField;
    const index = this.getIndexInSelectedFields(node);
    if (index !== -1) {
      //this.removeNodeFromSelectedFields(node);
    } else {
      //this.addNodeToSelectedFields(node);
    }
  }

  public setFieldAsRequired(field: BasicField) {
    //field.setMustHave(!field.getMustHave());
    this.selectedDataSelectionProfileFieldsService.updateField(field);
  }

  private getIndexInSelectedFields(node: BasicField): number {
    return this.selectedDataSelectionProfileFieldsService
      .getSelectedIds()
      .indexOf(node.getElementId());
  }

  /*
  private addNodeToSelectedFields(node: SelectedBasicField): void {
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
  }

  private removeNodeFromSelectedFields(node: BasicField): void {
    if (!node.getIsRequired()) {
      node.setIsSelected(false);
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);
    }
  }*/

  public removeNodeFromSelectedFields2(node: BasicField): void {
    if (!node.getIsRequired()) {
      node.setIsSelected(false);
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);

      /* this.selectedDataSelectionProfileFieldsService
        .getDeepCopyProfileFields()
        .pipe(
          first(),
          map((profileFields: BasicField[]) => {
            this.tree = FieldsTreeAdapter.fromTree(profileFields);
          })
        )
        .subscribe();
        */
    }
  }

  public isFieldRequired(field: BasicField) {
    return !field.getIsRequired();
  }

  public saveFields(): void {
    /* const profile = this.profileProviderService.getProfileById(this.id);

    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(
        first(),
        switchMap((profileFields) => {
          const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(
            profile,
            profileFields
          );
          this.profileProviderService.setProfileById(profile.getId(), dataSelectionProfile);
          this.setDataSelectionProvider(dataSelectionProfile);
          return this.selectedDataSelectionProfileFieldsService.getSelectedFields().pipe(
            first(),
            switchMap((selectedFields) => {
              const referencedProfiles = selectedFields
                .map((field) =>
                  field.getReferencedProfileUrls().length > 0
                    ? field.getReferencedProfileUrls()
                    : []
                )
                .reduce((acc, curr) => acc.concat(curr), []);
              if (referencedProfiles.length === 0) {
                return of([]);
              }
              // Fetch referenced profiles
              return this.createDataSelectionProfileService.fetchDataSelectionProfileData(
                referencedProfiles,
                true
              );
            })
          );
        })
      )
      .subscribe({
        next: (fetchedProfiles: DataSelectionProfile[]) => {
          fetchedProfiles.forEach((fetchedProfile) => this.setDataSelectionProvider(fetchedProfile));
        },
        error: (error) => {
          console.error('Error saving fields:', error);
        },
        complete: () => {
          this.dialogRef.close();
        },
      }); */
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, newProfile);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
