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

  constructor(
    private profileProviderService: ProfileProviderService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    console.log(this.referenceField);
    if (this.referenceField) {
      this.display = this.referenceField.getDisplay();
      this.elementId = this.referenceField.getElementId();
      this.type = this.referenceField.getType();
      this.getRefrencedProfiles();
    }
  }

  private getRefrencedProfiles() {
    this.parentProfile = this.profileProviderService.getProfileById(this.linkedProfileId);
    console.log(this.parentProfile);
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
