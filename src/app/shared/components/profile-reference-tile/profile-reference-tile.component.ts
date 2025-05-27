import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProfileCloner } from 'src/app/model/Utilities/DataSelecionCloner/DataSelectionProfileCloner';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { ProfileReferenceChipData } from '../../models/FilterChips/ProfileReferenceChipData';
import { ProfileReferenceChipsService } from '../../service/FilterChips/DataSelection/ProfileReferenceChips.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';
import { Subscription } from 'rxjs';
@Component({
  selector: 'num-profile-reference-tile',
  templateUrl: './profile-reference-tile.component.html',
  styleUrls: ['./profile-reference-tile.component.scss'],
})
export class ProfileReferenceTileComponent implements OnInit, OnDestroy {
  @Input() referenceField: SelectedReferenceField;
  @Input() unlinkedRequiredOrRecommendedReferences: ReferenceField;
  @Input() parentId?: string;
  @Output() deleteTrigger = new EventEmitter<boolean>();

  filterChips: ProfileReferenceChipData[] = [];
  type: string;
  display: Display;
  elementId: string;
  parentProfile: DataSelectionProfile;
  parentProfileSelectedReferences: SelectedReferenceField[] = [];

  dataSelectionProviderSubscription: Subscription;

  constructor(
    private dataSelectionProviderService: DataSelectionProviderService,
    private profileProviderService: ProfileProviderService,
    private profileReferenceChipsService: ProfileReferenceChipsService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.initiliazeDisplayData();
    this.initiliazeDisplayDataFiletrChips();
  }

  ngOnDestroy(): void {
    this.dataSelectionProviderSubscription?.unsubscribe();
  }

  private initiliazeDisplayData(): void {
    const field = this.referenceField || this.unlinkedRequiredOrRecommendedReferences;

    if (!field) {
      return;
    }

    this.display = field.getDisplay();
    this.elementId = field.getElementId();
    this.type = field.getType();
  }

  private initiliazeDisplayDataFiletrChips() {
    if (this.referenceField) {
      this.filterChips.push(
        this.profileReferenceChipsService.getProfileReferenceChips(this.referenceField)
      );
    }
  }

  public navigateToProfile(): void {
    const idToUse = this.parentId ?? '';
    this.navigationHelperService.navigateToEditProfile(idToUse);
  }

  public setMustHave(checked: boolean) {
    if (this.referenceField) {
      this.referenceField.setMustHave(checked);
      this.updateReferenceField();
    }
  }

  public deleteReferenceLink(): void {
    const profile = this.profileProviderService.getProfileById(this.parentId);
    if (this.unlinkedRequiredOrRecommendedReferences) {
      const profileFields = profile.getProfileFields().getReferenceFields();
      const foundField = profileFields.find(
        (field: ReferenceField) =>
          field.getElementId() === this.unlinkedRequiredOrRecommendedReferences.getElementId()
      );
      if (foundField) {
        foundField.setRecommended(false);
        this.updateProfile(profile);
      }
    } else if (this.referenceField) {
      const selectedReferences = profile.getProfileFields().getSelectedReferenceFields();
      const index = this.getIndexOfSelectedReferenceField(selectedReferences);

      if (index !== -1) {
        selectedReferences.splice(index, 1);
        this.updateProfile(profile);
      }
    }
    this.deleteTrigger.emit(true);
  }

  private updateReferenceField(): void {
    const profile = this.profileProviderService.getProfileById(this.parentId);
    const selectedReferences = profile.getProfileFields().getSelectedReferenceFields();
    const index = this.getIndexOfSelectedReferenceField(selectedReferences);

    if (index !== -1) {
      selectedReferences[index] = SelectedReferenceFieldsCloner.deepCopySelectedReferenceField(
        this.referenceField
      );
      this.updateProfile(profile);
    }
  }

  private updateProfile(profile: DataSelectionProfile): void {
    this.dataSelectionProviderSubscription?.unsubscribe();
    const updatedProfile = DataSelectionProfileCloner.deepCopyProfile(profile);
    this.profileProviderService.setProfileById(this.parentId, updatedProfile);
    this.dataSelectionProviderSubscription = this.dataSelectionProviderService
      .setProfileInActiveDataSelection(updatedProfile)
      .subscribe();
  }

  private getIndexOfSelectedReferenceField(selectedReferences: SelectedReferenceField[]): number {
    const index = selectedReferences.findIndex(
      (field: SelectedReferenceField) => field.getElementId() === this.referenceField.getElementId()
    );
    return index;
  }
}
