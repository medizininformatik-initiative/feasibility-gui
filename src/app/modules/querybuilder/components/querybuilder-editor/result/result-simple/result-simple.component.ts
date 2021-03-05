import { Component, Input, OnInit } from '@angular/core'
import { QueryResult } from '../../../../model/api/result/QueryResult'

@Component({
  selector: 'num-result-simple',
  templateUrl: './result-simple.component.html',
  styleUrls: ['./result-simple.component.scss'],
})
export class ResultSimpleComponent implements OnInit {
  @Input()
  result: QueryResult

  constructor() {}

  ngOnInit(): void {}
}
