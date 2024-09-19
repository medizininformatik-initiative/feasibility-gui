import { StructuredQueryCriterion } from './Criterion/StructuredQueryCriterion';

export class StructuredQuery {
  private readonly version: string = 'http://to_be_decided.com/draft-1/schema#';
  private display = '';

  private inclusionCriteria: StructuredQueryCriterion[][] = [];
  private exclusionCriteria: StructuredQueryCriterion[][] = [];

  constructor(
    inclusionCriteria: StructuredQueryCriterion[][],
    exclusionCriteria: StructuredQueryCriterion[][],
    display?: string
  ) {
    this.inclusionCriteria = inclusionCriteria;
    this.exclusionCriteria = exclusionCriteria;
    this.display = display;
  }

  public getInclusionCriteria(): StructuredQueryCriterion[][] {
    return this.inclusionCriteria;
  }

  public setInclusionCriteria(criteria: StructuredQueryCriterion[][]): void {
    this.inclusionCriteria = criteria;
  }

  public getExclusionCriteria(): StructuredQueryCriterion[][] {
    return this.exclusionCriteria;
  }

  public setExclusionCriteria(criteria: StructuredQueryCriterion[][]): void {
    this.exclusionCriteria = criteria;
  }

  public getVersion(): string {
    return this.version;
  }

  public getDisplay(): string {
    return this.display;
  }

  public setDisplay(display: string): void {
    this.display = display;
  }
}
