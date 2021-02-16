import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Group } from '../../model/api/query/group'
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
  dropping = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  doDrop($event: any): void {
    this.dropping.emit($event)
  }

  doDropAtEnd($event: any): void {
    this.dropping.emit({
      addMode: 'end',
      from: $event.previousContainer.data,
      to: $event.container.data,
    })
  }

  switch(mode: 'inclusion' | 'exclusion', $event: Criterion[][]): void {
    if (mode === 'inclusion') {
      this.group.inclusionCriteria = $event
    } else {
      this.group.exclusionCriteria = $event
    }
  }
}
