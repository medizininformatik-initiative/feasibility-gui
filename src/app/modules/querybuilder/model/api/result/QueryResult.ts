export class QueryResult {
  totalNumberOfPatients: number;
  queryId: string;
  resultLines: QueryResultLine[];
  issues?: [
    {
      message: string
      type: string
      code: string
      severity: string
    }
  ];
}

export class QueryResultLine {
  numberOfPatients: number;
  siteName: string;
}
