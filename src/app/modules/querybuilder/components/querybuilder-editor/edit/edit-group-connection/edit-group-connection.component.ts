import { Component, Inject, OnInit, Query } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import {
  Group,
  GroupDependencyInfo,
  InstanceRestrictionType,
  PeriodUnit,
  TimeRelation,
} from 'src/app/model/FeasibilityQuery/Group';

export class EditGroupConnectionComponentData {
  query: Query;
  connection: GroupDependencyInfo;
  parentGroup: Group;
  dependentGroup: Group;
}

@Component({
  selector: 'num-edit-group-connection',
  templateUrl: './edit-group-connection.component.html',
  styleUrls: ['./edit-group-connection.component.scss'],
})
export class EditGroupConnectionComponent implements OnInit {
  connection: GroupDependencyInfo;
  parentGroup: Group;
  dependentGroup: Group;
  queryModified: Query;
  querySnapshot: Query;

  restrictionTypeEver = InstanceRestrictionType.EVERY;
  restrictionTypeFirst = InstanceRestrictionType.FIRST;
  restrictionTypeLatest = InstanceRestrictionType.LATEST;

  day = PeriodUnit.DAY;
  month = PeriodUnit.MONTH;
  year = PeriodUnit.YEAR;

  before = TimeRelation.BEFORE;
  after = TimeRelation.AFTER;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditGroupConnectionComponentData,
    public dialogRef: MatDialogRef<EditGroupConnectionComponent, Query>
  ) {
    this.connection = data.connection;
    this.parentGroup = data.parentGroup;
    this.dependentGroup = data.dependentGroup;
    this.queryModified = data.query;
    this.querySnapshot = ObjectHelper.clone(data.query);
  }

  ngOnInit(): void {}

  doSave(): void {
    this.dialogRef.close(this.queryModified);
  }

  doDiscard(): void {
    this.dialogRef.close(this.querySnapshot);
  }
}
