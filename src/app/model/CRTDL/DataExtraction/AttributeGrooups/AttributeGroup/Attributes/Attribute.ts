export class Attributes {
  attributeRef: string;
  mustHave: boolean;

  constructor(attributeRef: string, mustHave: boolean) {
    this.attributeRef = attributeRef;
    this.mustHave = mustHave;
  }
}
