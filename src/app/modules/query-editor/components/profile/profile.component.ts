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
} from '@angular/core';

@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditProfileService],
})
export class ProfileComponent implements AfterViewInit {
  @Input()
  profile: DataSelectionProfile;

  @Output()
  profileChanged: EventEmitter<DataSelectionProfile> = new EventEmitter<DataSelectionProfile>();

  filterTemplates: TemplateRef<any>[] = [];

  @ViewChild('fields', { static: false, read: TemplateRef })
  fieldsTemplate: TemplateRef<any>;

  @ViewChild('filter', { static: false, read: TemplateRef })
  filterTemplate: TemplateRef<any>;

  profileTimeRestriction: ProfileTimeRestrictionFilter[] = [];

  profileTokenFilters: ProfileTokenFilter[] = [];

  profileTokenFilter: ProfileTokenFilter;

  constructor(private editProfileService: EditProfileService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateTemplatesArray();
  }

  private updateTemplatesArray(): void {
    this.filterTemplates = [];
    this.setFieldsTemplate();
    this.setFilterTemplate();
    this.cdr.detectChanges();
  }

  private setFilterTemplate(): void {
    if (this.profile.getFilters().length > 0) {
      this.setProfileTokenFilter();
      this.setTimeRestrictioFilter();
      this.filterTemplates.push(this.filterTemplate);
    }
  }
  private setTimeRestrictioFilter(): void {
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

  private setFieldsTemplate(): void {
    const fields: ProfileFields[] = this.profile.getFields();
    if (fields.length > 0) {
      this.filterTemplates.push(this.fieldsTemplate);
    }
  }

  public updateSelectedConcepts(concepts: Concept[]): void {
    console.log('updateSelectedConcepts', concepts);
    this.editProfileService.updateProfileTokenFilter(this.profile, concepts);
    this.emitProfileInstance();
  }

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
