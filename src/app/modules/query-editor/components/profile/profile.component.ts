import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { EditProfileService } from 'src/app/service/EditProfile.service';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';

@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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

  @ViewChild('timeRestriction', { static: false, read: TemplateRef })
  timeRestrictionTemplate: TemplateRef<any>;

  @ViewChild('concept', { static: false, read: TemplateRef })
  conceptTemplate: TemplateRef<any>;

  profileTimeRestriction: AbstractTimeRestriction;

  profileTokenFilter: ProfileTokenFilter;

  constructor(
    private editProfileService: EditProfileService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.updateTemplatesArrray();
    this.changeDetectorRef.detectChanges();
  }

  private updateTemplatesArrray() {
    this.filterTemplates = [];
    this.setConceptTemplate();
    this.setFieldsTemplate();
    this.setTimeRestrictionTemplate();
  }

  private setTimeRestrictionTemplate(): AbstractProfileFilter {
    const index = this.editProfileService.getTimeRestrictionFilterIndex(this.profile);
    if (index !== -1) {
      const filter = this.profile.getFilters()[index] as ProfileTimeRestrictionFilter;
      this.profileTimeRestriction = filter.getTimeRestriction();
      this.filterTemplates.push(this.timeRestrictionTemplate);
    }
    return null;
  }

  private setFieldsTemplate(): void {
    const fields: ProfileFields[] = this.profile.getFields();
    if (fields.length > 0) {
      this.filterTemplates.push(this.fieldsTemplate);
    }
  }

  private setConceptTemplate(): void {
    const index = this.editProfileService.getProfileTokenFilterIndex(this.profile);
    if (index !== -1) {
      this.profileTokenFilter = this.profile.getFilters()[index] as ProfileTokenFilter;
      this.filterTemplates.push(this.conceptTemplate);
    }
  }

  public updateSelectedConcepts(concepts: Concept[]): void {
    console.log(concepts);
    this.editProfileService.updateProfileTokenFilter(this.profile, concepts);
    this.onProfileChange.emit(this.profile);
  }

  public updateTimeRestriction(timeRestriction: AbstractTimeRestriction): void {
    this.editProfileService.updateTimeRestriction(this.profile, timeRestriction);
    this.onProfileChange.emit(this.profile);
  }
}
