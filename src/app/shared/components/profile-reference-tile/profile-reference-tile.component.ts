import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { ProfileReferenceChipData } from '../../models/FilterChips/ProfileReferenceChipData';
import { ProfileReferenceChipsService } from '../../service/FilterChips/DataSelection/ProfileReferenceChips.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';

@Component({
  selector: 'num-profile-reference-tile',
  templateUrl: './profile-reference-tile.component.html',
  styleUrls: ['./profile-reference-tile.component.scss'],
})
export class ProfileReferenceTileComponent implements OnInit {
  @Input()
  referenceField: SelectedReferenceField;

  @Input()
  unlinkedRequiredOrRecommendedReferences: ReferenceField;

  filterChips: ProfileReferenceChipData[] = [];

  @Input()
  parentId: string | undefined;

  type: string;

  display: Display;

  elementId: string;

  parentProfile: DataSelectionProfile;

  parentProfileSelectedReferences: SelectedReferenceField[] = [];

  constructor(
    private profileProviderService: ProfileProviderService,
    private profileReferenceChipsService: ProfileReferenceChipsService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.getReferencedProfiles();
  }

  private initialize(): void {
    if (this.referenceField) {
      this.display = this.referenceField.getDisplay();
      this.elementId = this.referenceField.getElementId();
      this.type = this.referenceField.getType();
      this.filterChips.push(
        this.profileReferenceChipsService.getProfileReferenceChips(this.referenceField)
      );
    } else if (this.unlinkedRequiredOrRecommendedReferences) {
      this.display = this.unlinkedRequiredOrRecommendedReferences.getDisplay();
      this.elementId = this.unlinkedRequiredOrRecommendedReferences.getElementId();
      this.type = this.unlinkedRequiredOrRecommendedReferences.getType();
    }
  }

  private getReferencedProfiles() {
    this.parentProfile = this.profileProviderService.getProfileById('');
    if (this.parentProfile?.getProfileFields().getSelectedReferenceFields().length > 0) {
      this.parentProfileSelectedReferences = this.parentProfile
        .getProfileFields()
        .getSelectedReferenceFields();
    }
  }

  public navigateToProfile(): void {
    if (true) {
      this.navigationHelperService.navigateToEditProfile('');
    } else {
      this.navigationHelperService.navigateToEditProfile(this.parentId);
    }
  }

  public deleteReferenceLink(): void {}
}
