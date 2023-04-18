import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/modules/querybuilder/model/api/query/query';
import { QueryResult } from 'src/app/modules/querybuilder/model/api/result/QueryResult';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service';
import { FeatureService } from 'src/app/service/feature.service';
@Component({
  selector: 'num-dataselection-editor',
  templateUrl: './dataselection-editor.component.html',
  styleUrls: ['./dataselection-editor.component.scss'],
})
export class DataselectionEditorComponent implements OnInit {
  query: Query;

  result: QueryResult;

  gottenDetailedResult: boolean;

  loadedResult: boolean;

  callsLimit: number;
  callsRemaining: number;

  constructor(
    public featureService: FeatureService,
    public queryProviderService: QueryProviderService,
    public backend: BackendService
  ) {}

  ngOnInit(): void {
    if (window.history.state.preventReset) {
      this.query = this.queryProviderService.query();
    } else {
      this.doReset();
    }
  }

  doReset(): void {
    this.query = QueryProviderService.createDefaultQuery();
    this.queryProviderService.store(this.query);
    this.result = null;
    this.gottenDetailedResult = false;
    this.loadedResult = false;
    this.getDetailedResultRateLimit();
  }

  getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
