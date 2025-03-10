export class Attributes {
  attributeRef: string;
  mustHave: boolean;

  constructor(attributeRef: string, mustHave: boolean) {
    this.attributeRef = attributeRef;
    this.mustHave = mustHave;
  }

  public getAttributeRef(): string {
    return this.attributeRef;
  }

  public setAttributeRef(value: string): void {
    this.attributeRef = value;
  }

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(value: boolean): void {
    this.mustHave = value;
  }

  public static fromJson(json: any): Attributes {
    return new Attributes(json.attributeRef, json.mustHave);
  }
}
