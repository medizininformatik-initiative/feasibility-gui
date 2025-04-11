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
  ViewChildren,
  QueryList,
} from '@angular/core';
import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

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
  @ViewChild('profileReferences', { static: false, read: TemplateRef })
  referenceTemplate: TemplateRef<any>;

  @ViewChildren('testTemplates', { read: TemplateRef })
  testTemplates: QueryList<TemplateRef<any>>;

  profileTimeRestriction: ProfileTimeRestrictionFilter[] = [];
  profileTokenFilters: ProfileTokenFilter[] = [];

  urlTree: TreeNode[];

  tests: ProfileTokenFilter[] = [];

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

  public normalizeRefrenceUrl(url: string): string {
    const lastPart = url.split('/').pop();
    const words = lastPart.split('-');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const result = capitalizedWords.join(' ');
    return result;
  }

  private setFilterTemplate(): void {
    if (this.profile.getFilters().length > 0) {
      this.setProfileTokenFilter();
      this.setTimeRestrictionFilter();
      this.templates.push({ template: this.filterTemplate, name: 'Filters' });
    }
  }

  private setProfileReferencesTemplate(): void {
    if (this.profile.getProfileFields().getReferenceFields().length > 0) {
      const urls = this.profile
        .getProfileFields()
        .getReferenceFields()[0]
        ?.getReferencedProfileUrls();
      const test = ProfileReferenceAdapter.adapt(urls);
      if (test.length > 0) {
        this.templates.push({ template: this.referenceTemplate, name: 'References' });
      }
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
  public updateProfile(updatedProfile: DataSelectionProfile): void {
    this.profile = updatedProfile;
    this.emitProfileInstance();
  }

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }
}
