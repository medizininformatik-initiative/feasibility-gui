import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CritType, Group } from '../../../../model/api/query/group'
import { Criterion } from '../../../../model/api/query/criterion'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { Query } from '../../../../model/api/query/query'

@Component({
  selector: 'num-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.scss'],
})
export class DisplayGroupComponent implements OnInit {
  @Input()
  group: Group

  @Input()
  query: Query

  @Output()
  dropped = new EventEmitter()

  @Output()
  storeQuery = new EventEmitter<void>()

  @Output()
  saveGroup = new EventEmitter<Group>()

  constructor() {}

  ngOnInit(): void {}

  doDrop($event: any): void {
    this.dropped.emit($event)
  }

  switch(critType: CritType, $event: Criterion[][]): void {
    if (critType === 'inclusion') {
      this.group.inclusionCriteria = $event
    } else {
      this.group.exclusionCriteria = $event
    }

    this.storeQuery.emit()
  }

  doDelete({ row, column }: { row: number; column: number }, critType: CritType): void {
    this.group = CritGroupArranger.removeFromGroup(this.group, {
      groupId: this.group.id,
      critType,
      row,
      column,
    })

    this.saveGroup.emit(this.group)
  }
}
