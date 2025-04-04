import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { Component, Input, OnInit } from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { first, map, of, switchMap } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';

@Component({
  selector: 'num-edit-fields',
  templateUrl: './edit-fields.component.html',
  styleUrls: ['./edit-fields.component.scss'],
  providers: [SelectedDataSelectionProfileFieldsService],
})
export class EditFieldsComponent implements OnInit {
  @Input()
  profile: DataSelectionProfile;

  tree: TreeNode[] = [];

  constructor(
    private profileProviderService: ProfileProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService
  ) {}

  ngOnInit() {
    console.log('Profile:', this.profile);
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(this.profile.getFields());

    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(
        first(),
        map((profileFields) => {
          this.setSelectedChildrenFields(profileFields); // Initialize selected fields
          this.tree = FieldsTreeAdapter.fromTree(profileFields); // Build the tree
        })
      )
      .subscribe();

    /*       this.selectedDataSelectionProfileFieldsService.getSelectedFields().subscribe((fields) => {
        fields.every((field) => this.profile.setSelectedFields(field))

      }); */
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

  private getIndexInSelectedFields(node: ProfileFields): number {
    return this.selectedDataSelectionProfileFieldsService
      .getSelectedIds()
      .indexOf(node.getElementId());
  }

  public setFieldAsRequired(selectedField: SelectedField) {
    selectedField.setMustHave(!selectedField.getMustHave());
    // this.selectedDataSelectionProfileFieldsService.updateField(selectedField);
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    node.setIsSelected(true);
    const selectedField = new SelectedField(node.getDisplay(), node.getElementId(), false, []);
    this.profile.getSelectedFields().push(selectedField);
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
  }

  private removeNodeFromSelectedFields(node: ProfileFields): void {
    if (!node.getIsRequired()) {
      node.setIsSelected(false);
      this.selectedDataSelectionProfileFieldsService.removeFromSelection(node);
    }
  }

  public saveFields(): void {
    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyProfileFields()
      .pipe(
        first(),
        switchMap((profileFields) => {
          const dataSelectionProfile = this.createInstanceOfDataSelectionProfile(
            this.profile,
            profileFields
          );
          this.profileProviderService.setProfileById(this.profile.getId(), dataSelectionProfile);
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
        complete: () => {},
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
}
