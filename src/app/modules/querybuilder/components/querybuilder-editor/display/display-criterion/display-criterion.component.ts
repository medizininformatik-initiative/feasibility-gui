import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'

@Component({
  selector: 'num-display-criterion',
  templateUrl: './display-criterion.component.html',
  styleUrls: ['./display-criterion.component.scss'],
})
export class DisplayCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion

  @Output()
  delete = new EventEmitter<Criterion>()

  constructor() {}

  ngOnInit(): void {}

  doDelete(): void {
    this.delete.emit(this.criterion)
  }
}
