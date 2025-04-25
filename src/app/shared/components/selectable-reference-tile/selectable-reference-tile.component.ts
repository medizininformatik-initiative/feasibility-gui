import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

@Component({
  selector: 'num-selectable-reference-tile',
  templateUrl: './selectable-reference-tile.component.html',
  styleUrls: ['./selectable-reference-tile.component.scss'],
})
export class SelectableReferenceTileComponent implements OnInit {
  @Input()
  profile: DataSelectionProfile;

  @Output()
  selectedProfile = new EventEmitter<string>();

  display: Display;

  label: string;

  constructor() {}

  ngOnInit(): void {
    this.display = this.profile.getDisplay();
    this.label = this.profile.getLabel();
  }

  public checkboxSelected(): void {
    this.selectedProfile.emit(this.profile.getId());
  }
}
