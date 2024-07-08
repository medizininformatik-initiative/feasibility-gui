import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export class EnterCriterionListComponentData {
  criterion: Criterion;
}

@Component({
  selector: 'num-edit-criterion-modal',
  templateUrl: './edit-criterion-modal.component.html',
  styleUrls: ['./edit-criterion-modal.component.scss'],
})
export class EditCriterionModalComponent implements OnInit {
  criterion: Criterion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EditCriterionModalComponent, Criterion>
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
  }

  saveCriterion() {
    this.dialogRef.close(this.criterion);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
