import { Component, Input, OnInit } from '@angular/core'
import { Query } from '../../model/api/query/query'
import { CritGroupArranger } from '../../controller/CritGroupArranger'

@Component({
  selector: 'num-display-query',
  templateUrl: './display-query.component.html',
  styleUrls: ['./display-query.component.scss'],
})
export class DisplayQueryComponent implements OnInit {
  @Input()
  query: Query

  constructor() {}

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
  }
}
