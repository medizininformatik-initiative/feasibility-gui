import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { EditProfileService } from 'src/app/service/EditProfile.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
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
    if (changes.profile && changes.profile.currentValue) {
      this.resetComponentState();
      this.updateTemplatesArray();
      this.cdr.detectChanges();
    }
  }

  private resetComponentState(): void {
    this.templates = [];
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
      this.templates.push({ template: this.filterTemplate, name: 'Filters' });
    }
  }

  private setProfileReferencesTemplate() {
    const refernceFields = this.profile.getProfileFields().getReferenceFields();
    if (refernceFields && refernceFields.length > 0) {
      this.templates.push({ template: this.referenceTemplate, name: 'References' });
    }
  }

  /**
   * Updates the profile fields and emits the updated profile.
   * @param updatedProfile - The updated profile instance.
   */
  public updateSelectedFields(updatedSelectedBasicFields: SelectedBasicField[]): void {
    this.profile.getProfileFields().setSelectedBasicFields(updatedSelectedBasicFields);
    this.emitProfileInstance();
  }

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }

  public updateProfileFilter(profileFilter: AbstractProfileFilter[]) {
    this.profile.setFilters(profileFilter);
    this.emitProfileInstance();
  }
}
