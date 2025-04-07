import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
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
  OnChanges,
  SimpleChanges,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataSelectionCloner } from 'src/app/model/Utilities/DataSelecionCloner/DataSelectionCloner';

@Component({
  selector: 'num-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditProfileService],
})
export class ProfileComponent implements AfterViewInit, OnChanges {
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

  constructor(private editProfileService: EditProfileService) {}

  ngAfterViewInit(): void {
    this.updateTemplatesArrray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile && changes.profile.currentValue) {
      this.updateTemplatesArrray();
    }
  }

  private updateTemplatesArrray(): void {
    this.filterTemplates = [];
    this.setConceptTemplate();
    this.setFieldsTemplate();
    this.setTimeRestrictionTemplate();
  }

  private setTimeRestrictionTemplate(): void {
    const index = this.editProfileService.getTimeRestrictionFilterIndex(this.profile);
    if (index !== -1) {
      const filter = this.profile.getFilters()[index] as ProfileTimeRestrictionFilter;
      this.profileTimeRestriction = filter.getTimeRestriction();
      this.filterTemplates.push(this.timeRestrictionTemplate);
    }
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
    this.editProfileService.updateProfileTokenFilter(this.profile, concepts);
    this.emitProfileInstance();
  }

  public updateTimeRestriction(timeRestriction: AbstractTimeRestriction): void {
    this.editProfileService.updateTimeRestriction(this.profile, timeRestriction);
    this.emitProfileInstance();
  }

  private emitProfileInstance(): void {
    this.profile = this.editProfileService.createNewProfileInstance(this.profile);
    this.profileChanged.emit(this.profile);
  }
}
