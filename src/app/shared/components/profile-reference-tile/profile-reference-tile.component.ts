import { Component, Input, OnInit } from '@angular/core';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

@Component({
  selector: 'num-profile-reference-tile',
  templateUrl: './profile-reference-tile.component.html',
  styleUrls: ['./profile-reference-tile.component.scss'],
})
export class ProfileReferenceTileComponent implements OnInit {
  @Input()
  referenceField: ReferenceField;

  @Input()
  linkedProfileId: string | undefined;

  @Input()
  parentId: string | undefined;

  type: string;

  display: Display;

  elementId: string;

  constructor(private navigationHelperService: NavigationHelperService) {}

  ngOnInit(): void {
    this.display = this.referenceField.getDisplay();
    this.elementId = this.referenceField.getElementId();
    this.type = this.referenceField.getType();
  }

  public navigateToProfile(): void {
    if (this.linkedProfileId) {
      this.navigationHelperService.navigateToEditProfile(this.linkedProfileId);
    } else {
      this.navigationHelperService.navigateToEditProfile(this.parentId);
    }
  }

  public deleteReferenceLink(): void {
    console.log(this.referenceField);
  }
}
