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
  singleQuery: Query

  @Input()
  singleTitle: string

  @Input()
  singleComment: string

  @Input()
  singleDate: number

  constructor() {}

  ngOnInit(): void {}
}
