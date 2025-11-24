import { AttributeGroupsData } from 'src/app/model/Interface/AttributeGroupsData';
import { AbstractAttributeGroupFilter } from './AttributeGroup/AbstractAttributeGroupFilter';
import { Attributes } from './AttributeGroup/Attributes/Attribute';
import { AttributesData } from 'src/app/model/Interface/AttributesData';

export class AttributeGroup {
  id: string;
  groupReference: string;
  attributes: Attributes[];
  filter: AbstractAttributeGroupFilter[];
  includeReferenceOnly?: boolean;
  name: string;

  constructor(
    id: string,
    groupReference: string,
    attributes: Attributes[],
    filter: AbstractAttributeGroupFilter[],
    name: string,
    includeReferenceOnly?: boolean
  ) {
    this.attributes = attributes;
    this.id = id;
    this.filter = filter;
    this.includeReferenceOnly = includeReferenceOnly || undefined;
    this.groupReference = groupReference;
    this.name = name;
  }

  public getGroupReference(): string {
    return this.groupReference;
  }

  public setGroupReference(value: string): void {
    this.groupReference = value;
  }

  public getAttributes(): Attributes[] {
    return this.attributes;
  }

  public setAttributes(value: Attributes[]): void {
    this.attributes = value;
  }

  public getFilter(): AbstractAttributeGroupFilter[] {
    return this.filter;
  }

  public setFilter(value: AbstractAttributeGroupFilter[]): void {
    this.filter = value;
  }

  public getIncludeReferenceOnly(): boolean {
    return this.includeReferenceOnly;
  }

  public setIncludeReferenceOnly(value: boolean): void {
    this.includeReferenceOnly = value;
  }

  public static fromJson(
    json: AttributeGroupsData,
    abstractAttributeGroupFilter: AbstractAttributeGroupFilter[]
  ): AttributeGroup {
    return new AttributeGroup(
      json.id,
      json.groupReference,
      json.attributes.map((attribute: AttributesData) => Attributes.fromJson(attribute)),
      abstractAttributeGroupFilter,
      json.name,
      json.includeReferenceOnly
    );
  }
}
