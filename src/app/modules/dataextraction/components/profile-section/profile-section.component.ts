// profile-section.component.ts
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'num-app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
})
export class ProfileSectionComponent {
  @Input() formGroup!: FormGroup;
}
