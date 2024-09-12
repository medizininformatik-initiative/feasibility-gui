import { QueryResultLine } from './QueryResultLine';

export class QueryResult {
  /**
   * A unique identifier for the QueryResult.
   */
  private id: string;
  private feasibilityQueryId: string;
  private totalNumberOfPatients: number;
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
    feasibilityQueryId: string,
    totalNumberOfPatients: number,
    id: string,
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
    this.feasibilityQueryId = feasibilityQueryId;
    this.totalNumberOfPatients = totalNumberOfPatients;
    this.id = id;
    this.resultLines = resultLines;
    this.issues = issues;
  }

  // Getter and Setter for totalNumberOfPatients
  getFeasibilityQueryId(): string {
    return this.feasibilityQueryId;
  }
  setFeasibilityQueryId(id: string): void {
    this.feasibilityQueryId = id;
  }
  getTotalNumberOfPatients(): number {
    return this.totalNumberOfPatients;
  }

  setTotalNumberOfPatients(value: number): void {
    this.totalNumberOfPatients = value;
  }

  // Getter and Setter for queryId
  getQueryId(): string {
    return this.id;
  }

  setQueryId(value: string): void {
    this.id = value;
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
