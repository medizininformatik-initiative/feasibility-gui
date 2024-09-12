import { AttributeGroup } from './AttributeGrooups/AttributeGroup';

export class DataExtraction {
  private attributeGroups: AttributeGroup[];

  constructor(attributeGroups: AttributeGroup[]) {
    this.attributeGroups = attributeGroups;
  }

  public getAttributeGroups(): AttributeGroup[] {
    return this.attributeGroups;
  }

  public setAttributeGroups(attributeGroups: AttributeGroup[]): void {
    this.attributeGroups = attributeGroups;
  }
}
