import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { CritType } from '../../../../model/api/query/group'

@Component({
  selector: 'num-display-crit-group',
  templateUrl: './display-crit-group.component.html',
  styleUrls: ['./display-crit-group.component.scss'],
})
export class DisplayCritGroupComponent implements OnInit {
  @Input()
  critGroup: Criterion[][]

  @Input()
  groupId: string

  @Input()
  critType: CritType

  @Output()
  dropped = new EventEmitter()

  @Output()
  switch = new EventEmitter()

  @Output()
  delete = new EventEmitter<{ row: number; column: number }>()

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
    this.switch.emit(this.critGroup)
  }

  joinInnerArrays(i: number): void {
    this.critGroup = CritGroupArranger.joinInnerArrays(this.critGroup, i)
    this.switch.emit(this.critGroup)
  }

  doDrop($event: any): void {
    this.dropped.emit({
      addMode: 'position',
      from: $event.previousContainer.data,
      to: $event.container.data,
    })
  }

  doDelete({ row, column }: { row: number; column: number }): void {
    this.delete.emit({ row, column })
  }

  doDropAtEnd($event: any): void {
    this.dropped.emit({
      addMode: 'end',
      from: $event.previousContainer.data,
      to: $event.container.data,
    })
  }
}
