export class QueryResult {
  totalNumberOfPatients: number;
  queryId: string;
  resultLines: QueryResultLine[];
  issues?: [];
}

export class QueryResultLine {
  numberOfPatients: number;
  siteName: string;
}
