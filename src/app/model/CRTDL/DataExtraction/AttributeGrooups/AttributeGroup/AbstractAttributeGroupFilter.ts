export abstract class AbstractAttributeGroupFilter {
  type: string;
  name: string;

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }
}
