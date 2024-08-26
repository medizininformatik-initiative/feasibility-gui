import { AttributeGroup } from './AttributeGrooups/AttributeGroup';

export class DataExtraction {
  attributeGroups: AttributeGroup[];

  constructor(attributeGroups: AttributeGroup[]) {
    this.attributeGroups = attributeGroups;
  }
}
