import { AbstractSavedFeasibilityQuery } from './AbstractSavedFeasibilityQuery';

export class SavedFeasibilityQueryListItem extends AbstractSavedFeasibilityQuery {
  private lastModified: string;
  private isValid: boolean;
  protected id: string;

  constructor(
    id: string,
    lastModified: string,
    isValid: boolean,
    totalNumberOfPatients: number,
    label: string,
    comment: string
  ) {
    super(comment, label, totalNumberOfPatients);
    this.lastModified = lastModified;
    this.isValid = isValid;
    this.id = id;
  }

  public getIsValid(): boolean {
    return this.isValid;
  }

  public setIsValid(isValid: boolean): void {
    this.isValid = isValid;
  }

  public getLastModified(): string {
    return this.lastModified;
  }

  public setLastModified(lastModified: string): void {
    this.lastModified = lastModified;
  }
}
