export class CriteriaSearchFilterValue {
  private count: number;
  private label: string;

  constructor(count: number, label: string) {
    this.count = count;
    this.label = label;
  }

  public getlabel(): string {
    return this.label;
  }

  public setLabel(label: string) {
    this.label = label;
  }

  public setCount(count: number): void {
    this.count = count;
  }

  public getCount(): number {
    return this.count;
  }
}
