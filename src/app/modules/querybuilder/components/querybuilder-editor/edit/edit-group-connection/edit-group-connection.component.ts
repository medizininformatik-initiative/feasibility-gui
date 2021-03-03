import { Component, Inject, OnInit } from '@angular/core'
import {
  Group,
  GroupDependencyInfo,
  InstanceRestrictionType,
  PeriodUnit,
  TimeRelation,
} from '../../../../model/api/query/group'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ObjectHelper } from '../../../../controller/ObjectHelper'
import { Query } from '../../../../model/api/query/query'

export class EditGroupConnectionComponentData {
  query: Query
  connection: GroupDependencyInfo
  parentGroup: Group
  dependentGroup: Group
}

@Component({
  selector: 'num-edit-group-connection',
  templateUrl: './edit-group-connection.component.html',
  styleUrls: ['./edit-group-connection.component.scss'],
})
export class EditGroupConnectionComponent implements OnInit {
  connection: GroupDependencyInfo
  parentGroup: Group
  dependentGroup: Group
  queryModified: Query
  querySnapshot: Query

  restrictionTypeEver = InstanceRestrictionType.EVERY
  restrictionTypeFirst = InstanceRestrictionType.FIRST
  restrictionTypeLatest = InstanceRestrictionType.LATEST

  day = PeriodUnit.DAY
  month = PeriodUnit.MONTH
  year = PeriodUnit.YEAR

  before = TimeRelation.BEFORE
  after = TimeRelation.AFTER

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditGroupConnectionComponentData,
    public dialogRef: MatDialogRef<EditGroupConnectionComponent, Query>
  ) {
    this.connection = data.connection
    this.parentGroup = data.parentGroup
    this.dependentGroup = data.dependentGroup
    this.queryModified = data.query
    this.querySnapshot = ObjectHelper.clone(data.query)
  }

  ngOnInit(): void {
    this.connection.restrictionType = this.findRestrictionType(this.connection.restrictionType)
    this.connection.dependentGroupRestrictionType = this.findRestrictionType(
      this.connection.dependentGroupRestrictionType
    )

    this.connection.atMostEarlierThanRelatedGroupTimeRelation = this.findTimeRelation(
      this.connection.atMostEarlierThanRelatedGroupTimeRelation
    )
    this.connection.atMostLaterThanRelatedGroupTimeRelation = this.findTimeRelation(
      this.connection.atMostLaterThanRelatedGroupTimeRelation
    )

    this.connection.atMostEarlierThanRelatedGroupUnit = this.findUnit(
      this.connection.atMostEarlierThanRelatedGroupUnit
    )
    this.connection.atMostLaterThanRelatedGroupUnit = this.findUnit(
      this.connection.atMostLaterThanRelatedGroupUnit
    )
  }

  private findTimeRelation(timeRelation: TimeRelation): TimeRelation {
    if (ObjectHelper.equals(timeRelation, this.before)) {
      return this.before
    }
    if (ObjectHelper.equals(timeRelation, this.after)) {
      return this.after
    }
    return undefined
  }

  private findUnit(periodUnit: PeriodUnit): PeriodUnit {
    if (ObjectHelper.equals(periodUnit, this.day)) {
      return this.day
    }
    if (ObjectHelper.equals(periodUnit, this.month)) {
      return this.month
    }
    if (ObjectHelper.equals(periodUnit, this.year)) {
      return this.year
    }
    return undefined
  }

  private findRestrictionType(restrictionType: InstanceRestrictionType): InstanceRestrictionType {
    if (ObjectHelper.equals(restrictionType, this.restrictionTypeEver)) {
      return this.restrictionTypeEver
    }
    if (ObjectHelper.equals(restrictionType, this.restrictionTypeLatest)) {
      return this.restrictionTypeLatest
    }
    if (ObjectHelper.equals(restrictionType, this.restrictionTypeFirst)) {
      return this.restrictionTypeFirst
    }
    return undefined
  }

  doSave(): void {
    this.dialogRef.close(this.queryModified)
  }

  doDiscard(): void {
    this.dialogRef.close(this.querySnapshot)
  }
}
