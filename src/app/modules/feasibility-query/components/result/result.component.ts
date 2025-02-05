import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'num-feasibility-query-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  resultLoaded = false;
  hasQueryResult: Observable<boolean>;
  constructor() {}

  ngOnInit() {}

  public setResultLoaded(value: boolean) {
    this.resultLoaded = value;
  }
}
