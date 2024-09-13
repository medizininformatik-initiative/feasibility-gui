export abstract class AbstractSavedFeasibilityQuery {
  protected abstract id: string;
  private comment: string;
  private label: string;
  private totalNumberOfPatients: number;

  constructor(comment: string, label: string, totalNumberOfPatients: number) {
    this.comment = comment;
    this.label = label;
    this.totalNumberOfPatients = totalNumberOfPatients;
  }

  public getComment(): string {
    return this.comment;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public getTotalNumberOfPatients(): number {
    return this.totalNumberOfPatients;
  }
}
