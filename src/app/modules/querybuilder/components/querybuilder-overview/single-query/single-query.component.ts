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
  isValid: boolean

  @Input()
  singleLabel: string

  @Input()
  singleComment: string

  @Input()
  singleDate: Date

  @Input()
  createdBy: string

  isInvalid: boolean

  constructor() {}

  ngOnInit(): void {
    if (this.isValid === false) {
      this.isInvalid = true
    }
  }
}
