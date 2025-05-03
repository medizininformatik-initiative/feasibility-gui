import { Component, Input, OnInit } from '@angular/core';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';

@Component({
  selector: 'num-possible-references',
  templateUrl: './possible-references.component.html',
  styleUrls: ['./possible-references.component.scss'],
})
export class PossibleReferencesComponent implements OnInit {
  @Input()
  posssibleReference: PossibleProfileReferenceData;

  selectedProfileId;

  constructor() {}

  ngOnInit(): void {}

  public selectedReference(profile: PossibleProfileReferenceData): void {
    this.selectedProfileId.emit(profile);
  }
}
