export class QueryResult {
  totalNumberOfPatients: number;
  queryId: string;
  resultLines: QueryResultLine[];
}

export class QueryResultLine {
  numberOfPatients: number;
  siteName: string;
}
