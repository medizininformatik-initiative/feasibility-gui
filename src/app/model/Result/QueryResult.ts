import { QueryResultLine } from './QueryResultLine';
export class QueryResult {
  private id: string;
  private feasibilityQueryId: string;
  private totalNumberOfPatients: number;
  private resultLines: QueryResultLine[] = [];
  private detailedReceived = false;
  issues?: [
    {
      message: string
      type: string
      code: string
      severity: string
    }
  ];

  constructor(
    detailedReceived: boolean,
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
    this.detailedReceived = detailedReceived;
    this.feasibilityQueryId = feasibilityQueryId;
    this.totalNumberOfPatients = totalNumberOfPatients;
    this.id = id;
    this.resultLines = resultLines;
    this.issues = issues;
  }

  public getDetailedReceived(): boolean {
    return this.detailedReceived;
  }

  public setDetailedReceived(detailedReceived: boolean): void {
    this.detailedReceived = detailedReceived;
  }

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

  getId(): string {
    return this.id;
  }

  setId(value: string): void {
    this.id = value;
  }

  getResultLines(): QueryResultLine[] {
    return this.resultLines;
  }

  setResultLines(value: QueryResultLine[]): void {
    this.resultLines = value;
  }

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
