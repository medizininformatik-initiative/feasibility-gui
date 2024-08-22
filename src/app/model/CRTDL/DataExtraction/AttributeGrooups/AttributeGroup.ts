import { AbstractAttributeGroupFilter } from './AttributeGroup/AbstractAttributeGroupFilter';
import { Attributes } from './AttributeGroup/Attributes/Attribute';

export class AttributeGroups {
  groupReference: string;
  attributes: Attributes[];
  filter: AbstractAttributeGroupFilter[];
  constructor(
    groupReference: string,
    attributes: Attributes[],
    filter: AbstractAttributeGroupFilter[]
  ) {
    this.groupReference = groupReference;
    this.attributes = attributes;
    this.filter = filter;
  }
}
