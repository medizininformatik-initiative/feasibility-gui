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
  possibleReferences: PossibleProfileReferenceData;

  @Output()
  selectedProfile = new EventEmitter<string>();

  display: Display;

  label: string;

  constructor() {}

  ngOnInit(): void {
    this.display = this.possibleReferences.display;
    this.label = this.possibleReferences.label;
  }

  public checkboxSelected(): void {
    const id = this.possibleReferences.id;
    this.selectedProfile.emit(id);
  }
}
