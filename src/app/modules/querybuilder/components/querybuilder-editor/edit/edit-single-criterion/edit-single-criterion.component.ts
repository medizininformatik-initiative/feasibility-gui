import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from '../../../../model/api/query/criterion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Query } from '../../../../model/api/query/query';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { CritGroupPosition } from '../../../../controller/CritGroupArranger';

export class EditSingleCriterionComponentData {
  criterion: Criterion;
  query: Query;
  position: CritGroupPosition;
}

@Component({
  selector: 'num-edit-single-criterion',
  templateUrl: './edit-single-criterion.component.html',
  styleUrls: ['./edit-single-criterion.component.scss'],
})
export class EditSingleCriterionComponent implements OnInit {
  queryModified: Query;
  querySnapshot: Query;
  criterion: Criterion;
  position: CritGroupPosition;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditSingleCriterionComponentData,
    public dialogRef: MatDialogRef<EditSingleCriterionComponent, Query>
  ) {
    this.criterion = data.criterion;
    this.queryModified = data.query;
    this.position = data.position;
    this.querySnapshot = ObjectHelper.clone(data.query);
  }

  ngOnInit(): void {}

  doSave(event: { groupId: number }): void {
    const index = this.queryModified.groups.findIndex((group) => group.id === event.groupId);

    if (index < 0) {
      return;
    }
    this.dialogRef.close(this.queryModified);
  }

  doCancel(): void {
    this.dialogRef.close(this.querySnapshot);
  }
}
