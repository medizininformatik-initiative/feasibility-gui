import { Component, Input, OnInit } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'

@Component({
  selector: 'num-display-criterion',
  templateUrl: './display-criterion.component.html',
  styleUrls: ['./display-criterion.component.scss'],
})
export class DisplayCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion

  constructor() {}

  ngOnInit(): void {}
}
