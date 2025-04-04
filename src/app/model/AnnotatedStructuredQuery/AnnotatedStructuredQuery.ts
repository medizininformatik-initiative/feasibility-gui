import { AnnotatedStructuredQueryCriterion } from './AnnotatedCriterion/AnnotatedStructuredQueryCriterion';

/**
 * @todo define class for inner array of inclusioncriteria
 */
export class AnnotatedStructuredQuery {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  inclusionCriteria: AnnotatedStructuredQueryCriterion[][] = [];
  exclusionCriteria: AnnotatedStructuredQueryCriterion[][];

  constructor(
    display: string,
    inclusionCriteria: AnnotatedStructuredQueryCriterion[][],
    exclusionCriteria: AnnotatedStructuredQueryCriterion[][]
  ) {
    this.display = display;
    this.inclusionCriteria = inclusionCriteria;
    this.exclusionCriteria = exclusionCriteria;
  }

  public getDisplay(): string {
    return this.display;
  }

  public setDisplay(value: string): void {
    this.display = value;
  }

  public getInclusionCriteria(): AnnotatedStructuredQueryCriterion[][] {
    return this.inclusionCriteria;
  }

  public setInclusionCriteria(value: AnnotatedStructuredQueryCriterion[][]): void {
    this.inclusionCriteria = value;
  }

  public getExclusionCriteria(): AnnotatedStructuredQueryCriterion[][] {
    return this.exclusionCriteria;
  }

  public setExclusionCriteria(value: AnnotatedStructuredQueryCriterion[][]): void {
    this.exclusionCriteria = value;
  }
}
