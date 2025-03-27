export abstract class AbstractAttributeGroupFilter {
  type: string;
  name: string;

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
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
}
