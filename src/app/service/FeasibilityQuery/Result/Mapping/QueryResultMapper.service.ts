import { Injectable } from '@angular/core';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultLine } from 'src/app/model/Result/QueryResultLine';

@Injectable({
  providedIn: 'root',
})
export class QueryResultMapperService {
  constructor() {}

  public createQueryResult(result: any, feasibilityQueryId: string): QueryResult {
    return new QueryResult(
      feasibilityQueryId,
      result.totalNumberOfPatients,
      result.queryId.toString(),
      this.createResultLines(result.resultLines),
      result.issues
    );
  }

  private createResultLines(resultLines: any[]): QueryResultLine[] {
    return resultLines.map((line) => new QueryResultLine(line.numberOfPatients, line.siteName));
  }
}
