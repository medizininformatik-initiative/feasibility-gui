import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
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
  dataSelectionProfileProfileNode: ProfileFields[];
  tree: TreeNode[];
  profileName: Display;

  removeFieldDisabled = false;
  arrayOfSelectedFields: ProfileFields[] = [];

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
    const node: ProfileFields = element.originalEntry as ProfileFields;
    const index = this.getIndexInSelectedFields(node);
    if (index !== -1) {
      this.removeNodeFromSelectedFields(node);
    } else {
      this.addNodeToSelectedFields(node);
    }
  }

  public setFieldAsRequired(field: ProfileFields) {
    //field.setMustHave(!field.getMustHave());
    this.selectedDataSelectionProfileFieldsService.updateField(field);
  }

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.selectedDataSelectionProfileFieldsService
      .getSelectedIds()
      .indexOf(node.getElementId());
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

  public saveFields(): void {
    const profile = this.profileProviderService.getProfileById(this.id);

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
      });
  }

  private setDataSelectionProvider(newProfile: DataSelectionProfile) {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, newProfile);
  }

  private createInstanceOfDataSelectionProfile(
    profile: DataSelectionProfile,
    profileFields: ProfileFields[]
  ) {
    return new DataSelectionProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profileFields,
      profile.getFilters(),
      profile.getReference(),
      profile.getSelectedFields()
    );
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
