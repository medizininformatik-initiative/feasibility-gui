import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { EditProfileService } from 'src/app/service/EditProfile.service';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';

@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditProfileService],
})
export class ProfileComponent implements AfterViewInit, OnChanges {
  @Input() profile: DataSelectionProfile;

  @Output() profileChanged: EventEmitter<DataSelectionProfile> =
    new EventEmitter<DataSelectionProfile>();

  templates: { template: TemplateRef<any>; name: string }[] = [];

  @ViewChild('fields', { static: false, read: TemplateRef }) fieldsTemplate: TemplateRef<any>;
  @ViewChild('filter', { static: false, read: TemplateRef }) filterTemplate: TemplateRef<any>;
  @ViewChild('reference', { static: false, read: TemplateRef })
  referenceTemplate: TemplateRef<any>;

  profileTimeRestriction: ProfileTimeRestrictionFilter[] = [];
  profileTokenFilters: ProfileTokenFilter[] = [];

  possibleReferences: TreeNode[][] = [];

  constructor(private editProfileService: EditProfileService, private cdr: ChangeDetectorRef) {}

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the templates for rendering.
   */
  ngAfterViewInit(): void {
    this.resetComponentState();
    this.updateTemplatesArray();
  }

  /**
   * Lifecycle hook that is called when the input properties of the component change.
   * @param changes - The changes to the input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed', changes);
    if (changes.profile && changes.profile.currentValue) {
      this.resetComponentState();
      this.updateTemplatesArray();
      this.cdr.detectChanges();
    }
  }

  private resetComponentState(): void {
    this.templates = [];
    this.profileTimeRestriction = [];
    this.profileTokenFilters = [];
  }

  private updateTemplatesArray(): void {
    this.setFieldsTemplate();
    this.setFilterTemplate();
    this.setProfileReferencesTemplate();
    this.cdr.detectChanges();
  }

  private setFieldsTemplate(): void {
    const fields = this.profile.getProfileFields().getFieldTree();
    if (fields.length > 0) {
      this.templates.push({ template: this.fieldsTemplate, name: 'Fields' });
    }
  }

  private setFilterTemplate(): void {
    if (this.profile.getFilters().length > 0) {
      this.setProfileTokenFilter();
      this.setTimeRestrictionFilter();
      this.templates.push({ template: this.filterTemplate, name: 'Filters' });
    }
  }

  private setProfileReferencesTemplate() {
    const refernceFields = this.profile.getProfileFields().getReferenceFields();
    if (refernceFields && refernceFields.length > 0) {
      this.templates.push({ template: this.referenceTemplate, name: 'References' });
    }
  }

  private setTimeRestrictionFilter(): void {
    const timeRestrictionFilter = this.editProfileService.getTimeRestrictionFilter(this.profile);
    timeRestrictionFilter.forEach((filter: ProfileTimeRestrictionFilter) => {
      this.profileTimeRestriction.push(filter);
    });
  }

  private setProfileTokenFilter(): void {
    const tokenFilter = this.editProfileService.getProfileTokenFilter(this.profile);
    tokenFilter.forEach((filter: ProfileTokenFilter) => {
      this.profileTokenFilters.push(filter);
    });
  }

  /**
   * Updates the token filter in the profile and emits the updated profile.
   * @param updatedTokenFilter - The updated token filter instance.
   */
  public updateTokenFilter(updatedTokenFilter: ProfileTokenFilter): void {
    this.editProfileService.updateProfileTokenFilter(this.profile, updatedTokenFilter);
    this.emitProfileInstance();
  }

  /**
   * Updates the time restriction in the profile and emits the updated profile.
   * @param timeRestriction - The updated time restriction.
   * @param profileFilter - The profile filter associated with the time restriction.
   */
  public updateTimeRestriction(
    timeRestriction: AbstractTimeRestriction,
    profileFilter: ProfileTimeRestrictionFilter
  ): void {
    this.editProfileService.updateTimeRestriction(
      this.profile,
      timeRestriction,
      profileFilter.getName()
    );
    this.emitProfileInstance();
  }

  /**
   * Updates the profile fields and emits the updated profile.
   * @param updatedProfile - The updated profile instance.
   */
  public updateSelectedFields(updatedSelectedBasicFields: SelectedBasicField[]): void {
    this.profile.getProfileFields().setSelectedBasicFields(updatedSelectedBasicFields);
    this.emitProfileInstance();
  }
  /*
  public updateSelectedReferences(selectedNode: TreeNode) {
    console.log('Selected node:', selectedNode);

    // Find the matching reference field
    const selectedField = this.profile
      .getProfileFields()
      .getReferenceFields()
      .find((field) =>
        field.getReferencedProfileUrls().some((url) => url === selectedNode.originalEntry)
      );
    // Only push the field if it exists
    if (selectedField) {
      this.createDataSelectionProfileService.fetchDataSelectionProfileData([selectedNode.originalEntry]).subscribe((data) => {
        const linkedProfileIds = data.map((item) => item.getId());
        const newSelectedField = new SelectedReferenceField(selectedField.getElementId(), selectedField.getDisplay(), selectedField.getDescription(), false, linkedProfileIds, selectedField.getReferencedProfileUrls());
        this.profile.getProfileFields().getSelectedReferenceFields().push(newSelectedField);
        this.emitProfileInstance();
      })
      console.log('Updated selected references:', this.profile.getProfileFields().getSelectedReferenceFields());
    } else {
      console.warn('No matching reference field found for the selected node.');
    }
  }*/

  public updateSelectedReferenceFields(updatedSelectedFields: any[]): void {
    //this.profile.getProfileFields().setSelectedReferenceFields(updatedSelectedFields);
    this.emitProfileInstance();
  }

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }
}
