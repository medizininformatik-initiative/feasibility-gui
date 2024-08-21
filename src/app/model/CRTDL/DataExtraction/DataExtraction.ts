import { AttributeGroups } from './AttributeGrooups/AttributeGroup';

export class DataExtraction {
  attributeGroups: AttributeGroups[];

  constructor(attributeGroups: AttributeGroups[]) {
    this.attributeGroups = attributeGroups;
  }
}
