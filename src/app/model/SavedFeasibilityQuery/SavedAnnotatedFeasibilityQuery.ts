import { AnnotatedStructuredQuery } from '../AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { AbstractSavedFeasibilityQuery } from './AbstractSavedFeasibilityQuery';

export class SavedAnnotatedFeasibilityQuery extends AbstractSavedFeasibilityQuery {
  protected id: string;
  private content: AnnotatedStructuredQuery;

  constructor(
    id: string,
    label: string,
    comment: string,
    totalNumberOfPatients: number,
    content: AnnotatedStructuredQuery
  ) {
    super(comment, label, totalNumberOfPatients);
    this.content = content;
    this.id = id;
  }

  public setContent(content: AnnotatedStructuredQuery): void {
    this.content = content;
  }

  public getContent(): AnnotatedStructuredQuery {
    return this.content;
  }
}
