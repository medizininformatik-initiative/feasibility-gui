import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

@Component({
  selector: 'num-profile-reference-tile',
  templateUrl: './profile-reference-tile.component.html',
  styleUrls: ['./profile-reference-tile.component.scss'],
})
export class ProfileReferenceTileComponent implements OnInit {
  @Input()
  referenceField: SelectedReferenceField;

  @Input()
  linkedProfileId: string | undefined;

  @Input()
  parentId: string | undefined;

  type: string;

  display: Display;

  elementId: string;

  parentProfile: DataSelectionProfile;

  parentProfileSelectedReferences: SelectedReferenceField[] = [];

  constructor(
    private profileProviderService: ProfileProviderService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    if (this.referenceField) {
      this.display = this.referenceField.getDisplay();
      this.elementId = this.referenceField.getElementId();
      this.type = this.referenceField.getType();
      this.getReferencedProfiles();
    }
  }

  private getReferencedProfiles() {
    this.parentProfile = this.profileProviderService.getProfileById(this.linkedProfileId);
    if (this.parentProfile?.getProfileFields().getSelectedReferenceFields().length > 0) {
      this.parentProfileSelectedReferences = this.parentProfile
        .getProfileFields()
        .getSelectedReferenceFields();
    }
  }

  public navigateToProfile(): void {
    if (this.linkedProfileId) {
      this.navigationHelperService.navigateToEditProfile(this.linkedProfileId);
    } else {
      this.navigationHelperService.navigateToEditProfile(this.parentId);
    }
  }

  public deleteReferenceLink(): void {}
}
