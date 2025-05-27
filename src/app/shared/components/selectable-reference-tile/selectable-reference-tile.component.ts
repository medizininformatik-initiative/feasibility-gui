import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';

@Component({
  selector: 'num-selectable-reference-tile',
  templateUrl: './selectable-reference-tile.component.html',
  styleUrls: ['./selectable-reference-tile.component.scss'],
})
export class SelectableReferenceTileComponent implements OnInit {
  @Input()
  possibleReference: PossibleProfileReferenceData;

  @Output()
  selectedProfile = new EventEmitter<PossibleProfileReferenceData>();

  display: Display;

  label: string;

  constructor() {}

  ngOnInit(): void {
    this.display = this.possibleReference.display;
    this.label = this.possibleReference.label;
  }

  public checkboxSelected(possibleReference: PossibleProfileReferenceData): void {
    this.selectedProfile.emit(possibleReference);
  }
}
