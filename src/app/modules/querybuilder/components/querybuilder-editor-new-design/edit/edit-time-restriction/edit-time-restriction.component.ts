import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { EditCriterionModalComponent } from '../edit-criterion-modal/edit-criterion-modal.component';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';

@Component({
  selector: 'num-edit-time-restriction',
  templateUrl: './edit-time-restriction.component.html',
  styleUrls: ['./edit-time-restriction.component.scss'],
})
export class EditTimeRestrictionComponent {
  @Input()
  timeRestriction: AbstractTimeRestriction;

  timeRestrictionOptions: string[] = Object.values(TimeRestrictionType);

  updateTimeRestriction(timeRestriction) {
    this.timeRestriction = timeRestriction;
  }
}
