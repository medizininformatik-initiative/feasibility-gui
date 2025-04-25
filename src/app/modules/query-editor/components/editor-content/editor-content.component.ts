import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';

@Component({
  selector: 'num-editor-content',
  templateUrl: './editor-content.component.html',
  styleUrls: ['./editor-content.component.scss'],
})
export class EditorContentComponent implements OnInit {
  @Input() profile: DataSelectionProfile;
  @Input() criterion: Criterion;

  @Output() criterionChanged = new EventEmitter<Criterion>();

  constructor() {}

  ngOnInit() {}

  public onCriterionChanged(updatedCriterion: Criterion): void {
    this.criterionChanged.emit(updatedCriterion);
  }
}
