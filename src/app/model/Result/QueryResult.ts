import { QueryResultLine } from './QueryResultLine';

export class QueryResult {
  private feasibilityQueryID: string;
  private totalNumberOfPatients: number;
  private queryId: string;
  private resultLines: QueryResultLine[] = [];
  private issues?: [
    {
      message: string
      type: string
      code: string
      severity: string
    }
  ];

  constructor(
    feasibilityQueryID: string,
    totalNumberOfPatients: number,
    queryId: string,
    resultLines: QueryResultLine[] = [],
    issues?: [
      {
        message: string
        type: string
        code: string
        severity: string
      }
    ]
  ) {
    this.feasibilityQueryID = feasibilityQueryID;
    this.totalNumberOfPatients = totalNumberOfPatients;
    this.queryId = queryId;
    this.resultLines = resultLines;
    this.issues = issues;
  }

  // Getter and Setter for totalNumberOfPatients
  getFeasibilityQueryID(): string {
    return this.feasibilityQueryID;
  }
  setFeasibilityQueryID(id: string): void {
    this.feasibilityQueryID = id;
  }
  getTotalNumberOfPatients(): number {
    return this.totalNumberOfPatients;
  }

  setTotalNumberOfPatients(value: number): void {
    this.totalNumberOfPatients = value;
  }

  // Getter and Setter for queryId
  getQueryId(): string {
    return this.queryId;
  }

  setQueryId(value: string): void {
    this.queryId = value;
  }

  // Getter and Setter for resultLines
  getResultLines(): QueryResultLine[] {
    return this.resultLines;
  }

  setResultLines(value: QueryResultLine[]): void {
    this.resultLines = value;
  }

  // Getter and Setter for issues
  getIssues():
    | [
        {
          message: string
          type: string
          code: string
          severity: string
        }
      ]
    | undefined {
    return this.issues;
  }

  setIssues(
    value:
      | [
          {
            message: string
            type: string
            code: string
            severity: string
          }
        ]
      | undefined
  ): void {
    this.issues = value;
  }
}
