import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeasibilityQueryResultService } from 'src/app/service/FeasibilityQuery/Result/FeasibilityQueryResult.service';
import { Observable } from 'rxjs';
import { BackendService } from 'src/app/service/Backend/Backend.service';
import { FeasibilityQueryApiService } from 'src/app/service/Backend/Api/FeasibilityQueryApi.service';
@Component({
  selector: 'num-feasibility-query-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  resultLoaded = false;
  hasQueryResult: Observable<boolean>;
  constructor(private feasibilityQueryResultService: FeasibilityQueryResultService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.feasibilityQueryResultService.stopPolling();
  }

  public setResultLoaded(value: boolean) {
    this.resultLoaded = value;
  }
}
