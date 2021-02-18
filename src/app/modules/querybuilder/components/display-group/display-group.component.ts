import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CritType, Group } from '../../model/api/query/group'
import { Criterion } from '../../model/api/query/criterion'

@Component({
  selector: 'num-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.scss'],
})
export class DisplayGroupComponent implements OnInit {
  @Input()
  group: Group

  @Output()
  dropped = new EventEmitter()

  @Output()
  storeQuery = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {}

  doDrop($event: any): void {
    this.dropped.emit($event)
  }

  doDropAtEnd($event: any): void {
    this.dropped.emit({
      addMode: 'end',
      from: $event.previousContainer.data,
      to: $event.container.data,
    })
  }

  switch(critType: CritType, $event: Criterion[][]): void {
    if (critType === 'inclusion') {
      this.group.inclusionCriteria = $event
    } else {
      this.group.exclusionCriteria = $event
    }

    this.storeQuery.emit()
  }
}
