import { Component, Input, OnInit } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion

  constructor() {}

  ngOnInit(): void {}
}
