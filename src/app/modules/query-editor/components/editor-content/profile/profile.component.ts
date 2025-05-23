import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';
import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
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
 * Newly added and stagged references are managed automatically in the StagedProfileService.
 */
export class ProfileComponent implements AfterViewInit, OnInit, OnDestroy {
  profile: DataSelectionProfile;

  stagedProfileServiceSubscription: Subscription;

  possibleReferencesServiceSubscription: Subscription;

  templates: { template: TemplateRef<any>; name: string }[] = [];

  @ViewChild('fields', { static: false, read: TemplateRef })
  readonly fieldsTemplate: TemplateRef<any>;
  @ViewChild('filter', { static: false, read: TemplateRef })
  readonly filterTemplate: TemplateRef<any>;
  @ViewChild('reference', { static: false, read: TemplateRef })
  readonly referenceTemplate: TemplateRef<any>;

  constructor(
    private cdr: ChangeDetectorRef,
    private stagedProfileService: StagedProfileService,
    private possibleReferencesService: PossibleReferencesService
  ) {}

  ngOnInit(): void {
    this.stagedProfileServiceSubscription?.unsubscribe();
    this.stagedProfileServiceSubscription = this.stagedProfileService
      .getProfileObservable()
      .subscribe((profile) => {
        this.profile = profile;
      });
  }

  ngOnDestroy(): void {
    this.stagedProfileServiceSubscription?.unsubscribe();
    this.possibleReferencesServiceSubscription?.unsubscribe();
    this.possibleReferencesService.clearPossibleReferencesMap();
  }

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initializes the templates for rendering.
   */
  ngAfterViewInit(): void {
    this.templates = [];
    this.updateTemplatesArray();
  }

  private updateTemplatesArray(): void {
    this.setFieldsTemplate();
    this.setFilterTemplate();
    this.setReferencesTemplate();
    this.cdr.detectChanges();
  }

  private setFieldsTemplate(): void {
    const fields = this.profile.getProfileFields().getFieldTree();
    if (fields.length > 0) {
      this.templates.push({ template: this.fieldsTemplate, name: 'FIELD' });
    }
  }

  private setFilterTemplate(): void {
    if (this.profile.getFilters().length > 0) {
      this.templates.push({ template: this.filterTemplate, name: 'FILTER' });
    }
  }

  private setReferencesTemplate(): void {
    const referenceFields = this.profile.getProfileFields().getReferenceFields();
    if (referenceFields && referenceFields.length > 0) {
      this.possibleReferencesServiceSubscription?.unsubscribe();
      //this.possibleReferencesServiceSubscription = this.possibleReferencesService.initialize(this.profile.getId()).subscribe();
      this.templates.push({ template: this.referenceTemplate, name: 'REFERENCE' });
    }
  }

  public updateSelectedFields(updatedSelectedBasicFields: SelectedBasicField[]): void {
    this.stagedProfileService.updateSelectedBasicFields(updatedSelectedBasicFields);
  }

  public updateProfileFilter(profileFilter: AbstractProfileFilter[]) {
    this.stagedProfileService.updateFilters(profileFilter);
  }

  public updateSelectedReferenceFields(selectedReferenceFields: SelectedReferenceField[]): void {
    this.stagedProfileService.updateSelectedReferenceFields(selectedReferenceFields);
  }

  public updateLabel(label: string): void {
    this.stagedProfileService.updateLabel(label);
  }
}
