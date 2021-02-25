import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { MatDialog } from '@angular/material/dialog'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { Subscription } from 'rxjs'
import { Group } from '../../../../model/api/query/group'

@Component({
  selector: 'num-display-query',
  templateUrl: './display-query.component.html',
  styleUrls: ['./display-query.component.scss'],
})
export class DisplayQueryComponent implements OnInit, OnDestroy {
  @Input()
  query: Query

  @Output()
  storeQuery = new EventEmitter<Query>()

  private subscription: Subscription

  constructor(private dialog: MatDialog, private provider: QueryProviderService) {}

  ngOnInit(): void {
    this.subscription = this.dialog.afterAllClosed.subscribe(() => {
      this.query = this.provider.query()
    })
  }

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

    this.doStoreQuery()
  }

  doStoreQuery(): void {
    this.storeQuery.emit(this.query)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  doSaveGroup(group: Group): void {
    const index = this.query.groups.findIndex((groupTemp) => groupTemp.id === group.id)

    if (index !== undefined) {
      this.query.groups[index] = group
      this.storeQuery.emit(this.query)
    }
  }
}
