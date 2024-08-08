export class DataSelectionProfileProfileFilter {
  private type: string;
  private name: string;
  private uiType: string;
  private referencedCriteriaSet: string;

  constructor(type: string, name: string, uiType: string, referencedCriteriaSet: string) {
    this.type = type;
    this.name = name;
    this.uiType = uiType;
    this.referencedCriteriaSet = referencedCriteriaSet;
  }

  public getType(): string {
    return this.type;
  }

  public setType(value: string): void {
    this.type = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
  }

  public getUiType(): string {
    return this.uiType;
  }

  public setUiType(value: string): void {
    this.uiType = value;
  }

  public getReferencedCriteriaSet(): string {
    return this.referencedCriteriaSet;
  }

  public setReferencedCriteriaSet(value: string): void {
    this.referencedCriteriaSet = value;
  }
}
