import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { first, map, of, switchMap } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-edit-fields',
  templateUrl: './edit-fields.component.html',
  styleUrls: ['./edit-fields.component.scss'],
  providers: [SelectedDataSelectionProfileFieldsService],
})
export class EditFieldsComponent implements OnInit {
  @Input()
  profile: DataSelectionProfile;

  @Output()
  updatedProfile: EventEmitter<DataSelectionProfile> = new EventEmitter<DataSelectionProfile>();

  tree: TreeNode[] = [];

  constructor(
    private profileProviderService: ProfileProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService
  ) {}

  ngOnInit() {
    this.traversAndUpddateTree();
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
  }

  public setSelectedChildrenFields(fields: ProfileFields[]) {
    fields.forEach((field) => {
      if (field.getIsSelected() || field.getIsRequired()) {
        this.selectedDataSelectionProfileFieldsService.addToSelection(field);
      }
      this.setSelectedChildrenFields(field.getChildren());
    });
  }

  public traversAndUpddateTree() {
    this.selectedDataSelectionProfileFieldsService.updateSelectionStatus(
      this.profile.getFields(),
      this.profile.getSelectedFields()
    );
  }

  public setSelectedFieldElement(element) {
    const node: ProfileFields = element.originalEntry as ProfileFields;
    const index = this.getIndexInSelectedFields(node.getElementId());
    if (index !== -1) {
      this.spliceAndEmit(index);
    } else {
      this.addNodeToSelectedFields(node);
    }
    this.traversAndUpddateTree();
  }

  private getIndexInSelectedFields(elementId: string): number {
    return this.profile
      .getSelectedFields()
      .findIndex((selectedField) => selectedField.getElementId() === elementId);
  }

  public setFieldAsRequired(selectedField: SelectedField) {
    selectedField.setMustHave(!selectedField.getMustHave());
  }

  public removeSelectedField(node: ProfileFields): void {
    const index = this.getIndexInSelectedFields(node.getElementId());
    if (index !== -1) {
      this.spliceAndEmit(index);
    }
  }

  private spliceAndEmit(index: number): void {
    this.profile.getSelectedFields().splice(index, 1);
    this.traversAndUpddateTree();
    this.emitUpdatedSelectedFields();
  }

  private addNodeToSelectedFields(node: ProfileFields): void {
    node.setIsSelected(true);
    const selectedField = new SelectedField(node.getDisplay(), node.getElementId(), false, []);
    this.profile.getSelectedFields().push(selectedField);
    this.selectedDataSelectionProfileFieldsService.addToSelection(node);
    this.emitUpdatedSelectedFields();
  }

  private emitUpdatedSelectedFields(): void {
    this.updatedProfile.emit(this.profile); // Emit the updated fields
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
          console.log('Saving profile');
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
