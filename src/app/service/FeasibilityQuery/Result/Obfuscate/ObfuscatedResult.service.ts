import { FeasibilityQueryResultApiService } from '../../../Backend/Api/FeasibilityQueryResultApi.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultMapperService } from '../Mapping/QueryResultMapper.service';

@Injectable({
  providedIn: 'root',
})
export class ObfuscatedResultService {
  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private queryResultMapperService: QueryResultMapperService
  ) {}

  public getDetailedObfuscatedResult(
    feasibilityQueryResultId: string,
    feasibilityQueryId: string
  ): Observable<QueryResult> {
    return this.feasibilityQueryResultApiService
      .getDetailedObfuscatedResult(feasibilityQueryResultId)
      .pipe(
        map((result) => this.mapQueryResult(result, feasibilityQueryId))
      );
  }

  private mapQueryResult(result, feasibilityQueryId: string): QueryResult {
    const queryResult: QueryResult = this.queryResultMapperService.createQueryResult(
      true,
      result,
      feasibilityQueryId
    );
    return queryResult;
  }
}
