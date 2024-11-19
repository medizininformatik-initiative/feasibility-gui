import { AbstractAttributeGroupFilter } from './AttributeGroup/AbstractAttributeGroupFilter';
import { Attributes } from './AttributeGroup/Attributes/Attribute';

export class AttributeGroup {
  groupReference: string;
  attributes: Attributes[];
  filter: AbstractAttributeGroupFilter[];
  includeReferenceOnly?: boolean;

  constructor(
    groupReference: string,
    attributes: Attributes[],
    filter: AbstractAttributeGroupFilter[],
    includeReferenceOnly?: boolean
  ) {
    this.groupReference = groupReference;
    this.attributes = attributes;
    this.filter = filter;
    this.includeReferenceOnly = includeReferenceOnly || undefined;
  }
}
