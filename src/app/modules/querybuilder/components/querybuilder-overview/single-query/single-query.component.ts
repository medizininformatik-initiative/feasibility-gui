import { Component, Input, OnInit } from '@angular/core'
import { Query } from '../../../model/api/query/query'

@Component({
  selector: 'num-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss'],
})
export class SingleQueryComponent implements OnInit {
  @Input()
  index: number

  @Input()
  id: number

  @Input()
  singleQuery: Query

  @Input()
  singleLabel: string

  @Input()
  singleComment: string

  @Input()
  singleDate: Date

  @Input()
  createdBy: string

  constructor() {}

  ngOnInit(): void {}
}
