import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';

@Component({
  selector: 'num-possible-references',
  templateUrl: './possible-references.component.html',
  styleUrls: ['./possible-references.component.scss'],
})
export class PossibleReferencesComponent implements OnInit {
  @Input()
  posssibleReference: PossibleProfileReferenceData;

  @Output()
  selectedProfileId = new EventEmitter<PossibleProfileReferenceData>();

  constructor() {}

  ngOnInit(): void {}

  public selectedReference(profile: PossibleProfileReferenceData): void {
    this.selectedProfileId.emit(profile);
  }
}
