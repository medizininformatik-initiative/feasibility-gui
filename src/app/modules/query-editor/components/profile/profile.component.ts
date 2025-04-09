import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { EditProfileService } from 'src/app/service/EditProfile.service';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
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

  templates: TemplateRef<any>[] = [];

  @ViewChild('fields', { static: false, read: TemplateRef }) fieldsTemplate: TemplateRef<any>;
  @ViewChild('filter', { static: false, read: TemplateRef }) filterTemplate: TemplateRef<any>;

  profileTimeRestriction: ProfileTimeRestrictionFilter[] = [];
  profileTokenFilters: ProfileTokenFilter[] = [];

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
    this.cdr.detectChanges();
  }

  private setFieldsTemplate(): void {
    const fields: ProfileFields[] = this.profile.getFields();
    if (fields.length > 0) {
      this.templates.push(this.fieldsTemplate);
    }
  }

  private setFilterTemplate(): void {
    if (this.profile.getFilters().length > 0) {
      this.setProfileTokenFilter();
      this.setTimeRestrictionFilter();
      this.templates.push(this.filterTemplate);
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
   * Updates the selected concepts in the profile and emits the updated profile.
   * @param concepts - The updated list of selected concepts.
   */
  public updateSelectedConcepts(concepts: Concept[]): void {
    this.editProfileService.updateProfileTokenFilter(this.profile, concepts);
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

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }
}
