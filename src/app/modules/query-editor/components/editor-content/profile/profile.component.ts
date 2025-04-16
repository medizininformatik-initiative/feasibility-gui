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
import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { DataSelectionProviderService } from '../../../../data-selection/services/DataSelectionProvider.service';
import { ActiveDataSelectionService } from '../../../../../service/Provider/ActiveDataSelection.service';

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
  @ViewChild('references', { static: false, read: TemplateRef }) referenceTemplate: TemplateRef<any>;

  profileTimeRestriction: ProfileTimeRestrictionFilter[] = [];
  profileTokenFilters: ProfileTokenFilter[] = [];

  urlTree: TreeNode[][] = [];

  possibleReferences: TreeNode[][] = [];

  constructor(
    private editProfileService: EditProfileService,
    private cdr: ChangeDetectorRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

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
    this.getPossibleReferences();
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

  private setProfileReferencesTemplate() {
    this.urlTree = [];
    this.profile
      .getProfileFields()
      ?.getReferenceFields()
      .forEach((field) => {
        const urls = field.getReferencedProfileUrls();
        const adaptedUrls = ProfileReferenceAdapter.adapt(urls);
        this.urlTree.push(adaptedUrls);
      });

    if (this.urlTree.length > 0) {
      this.templates.push({ template: this.referenceTemplate, name: 'References' });
    }
  }

  getPossibleReferences() {
    this.possibleReferences = [];
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      this.urlTree.forEach((urls) => {
        this.possibleReferences.push(
          urls.filter(
            (referencedUrl) =>
              dataSelection
                .getProfiles()
                .filter(
                  (profile) =>
                    profile.getUrl() === referencedUrl.id &&
                    profile.getUrl() !== this.profile.getUrl()
                ).length > 0
          )
        );
      });
    });
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

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }
}
