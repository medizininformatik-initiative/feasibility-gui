import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * The ProfileComponent is responsible for displaying and managing the data selection profile.
 * It initializes the profile, updates selected fields, and manages filters.
 * References are managed automatically in the StagedProfileService.
 */
export class ProfileComponent implements AfterViewInit {
  @Input() profile: DataSelectionProfile;

  templates: { template: TemplateRef<any>; name: string }[] = [];

  @ViewChild('fields', { static: false, read: TemplateRef }) fieldsTemplate: TemplateRef<any>;
  @ViewChild('filter', { static: false, read: TemplateRef }) filterTemplate: TemplateRef<any>;
  @ViewChild('reference', { static: false, read: TemplateRef }) referenceTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef, private stagedProfileService: StagedProfileService) {}

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the templates for rendering.
   */
  ngAfterViewInit(): void {
    this.resetComponentState();
    this.updateTemplatesArray();
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
    const referenceFields = this.profile.getProfileFields().getReferenceFields();
    if (referenceFields && referenceFields.length > 0) {
      this.templates.push({ template: this.referenceTemplate, name: 'References' });
    }
  }

  public updateSelectedFields(updatedSelectedBasicFields: SelectedBasicField[]): void {
    this.stagedProfileService.updateSelectedBasicFields(updatedSelectedBasicFields);
  }

  public updateProfileFilter(profileFilter: AbstractProfileFilter[]) {
    this.stagedProfileService.updateFilters(profileFilter);
  }
}
