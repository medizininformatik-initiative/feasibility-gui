import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { Group } from '../../../../model/api/query/group'

@Component({
  selector: 'num-display-query',
  templateUrl: './display-query.component.html',
  styleUrls: ['./display-query.component.scss'],
})
export class DisplayQueryComponent implements OnInit {
  @Input()
  query: Query

  constructor() {}

  @Output()
  storeQuery = new EventEmitter<Query>()

  ngOnInit(): void {}

  doDrop($event: any): void {
    if ($event.addMode === 'position') {
      this.query.groups = CritGroupArranger.moveCriterion(this.query.groups, $event.from, $event.to)
    } else if ($event.addMode === 'end') {
      this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
        this.query.groups,
        $event.from,
        $event.to
      )
    }

    this.doStoreQuery(this.query)
  }

  doStoreQuery(query: Query): void {
    this.storeQuery.emit(query)
  }

  doSaveGroup(group: Group): void {
    const index = this.query.groups.findIndex((groupTemp) => groupTemp.id === group.id)

    if (index >= 0) {
      this.query.groups[index] = group
      this.storeQuery.emit(this.query)
    }
  }
}
