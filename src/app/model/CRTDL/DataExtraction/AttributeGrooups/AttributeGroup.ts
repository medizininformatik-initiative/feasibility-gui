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
    json: any,
    abstractAttributeGroupFilter: AbstractAttributeGroupFilter[]
  ): AttributeGroup {
    return new AttributeGroup(
      json.groupReference,
      json.attributes.map((attribute: any) => Attributes.fromJson(attribute)),
      abstractAttributeGroupFilter,
      json.includeReferenceOnly
    );
  }
}
