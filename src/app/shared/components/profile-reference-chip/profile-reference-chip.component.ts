import { Component } from '@angular/core';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

@Component({
  selector: 'num-profile-reference-chip',
  templateUrl: './profile-reference-chip.component.html',
  styleUrls: ['./profile-reference-chip.component.scss'],
})
export class ProfileReferenceChipComponent {
  display: Display;

  label: string;

  linkedProfileId: string;

  elementId: string;
}
