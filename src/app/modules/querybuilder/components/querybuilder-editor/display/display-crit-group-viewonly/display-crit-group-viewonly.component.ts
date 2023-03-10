import { Component, Input, OnInit } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { Query } from '../../../../model/api/query/query'
import { CritType } from '../../../../model/api/query/group'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'

@Component({
  selector: 'num-display-crit-group-viewonly',
  templateUrl: './display-crit-group-viewonly.component.html',
  styleUrls: ['./display-crit-group-viewonly.component.scss'],
})
export class DisplayCritGroupViewonlyComponent implements OnInit {
  @Input()
  query: Query

  @Input()
  critGroup: Criterion[][]

  @Input()
  critType: CritType

  @Input()
  groupId: number

  constructor() {}

  ngOnInit(): void {}

  getInnerLabelKey(): 'AND' | 'OR' {
    return this.critType === 'inclusion' ? 'OR' : 'AND'
  }

  getOuterLabelKey(): 'AND' | 'OR' {
    return this.critType === 'exclusion' ? 'OR' : 'AND'
  }

  splitInnerArray(i: number, j: number): void {
    this.critGroup = CritGroupArranger.splitInnerArray(this.critGroup, i, j)
  }

  joinInnerArrays(i: number): void {
    this.critGroup = CritGroupArranger.joinInnerArrays(this.critGroup, i)
  }
}
