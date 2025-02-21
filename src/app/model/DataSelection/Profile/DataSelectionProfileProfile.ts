import { AbstractProfileFilter } from './Filter/AbstractProfileFilter';
import { ProfileFields } from './Fields/ProfileFields';
import { Display } from './Display';
import { TranslateService } from '@ngx-translate/core';
import { ProfileReference } from './Reference/ProfileReference';

export class DataSelectionProfileProfile {
  private id: string;
  private url: string;
  private display: Display;
  private fields: ProfileFields[] = [];
  private filters: AbstractProfileFilter[] = [];
  private label: string;
  private reference: ProfileReference;

  constructor(
    id: string,
    url: string,
    display: Display,
    fields: ProfileFields[] = [],
    filters: AbstractProfileFilter[] = [],
    reference: ProfileReference
  ) {
    this.id = id;
    this.url = url;
    this.display = display;
    this.fields = fields;
    this.filters = filters;
    this.reference = reference;
  }

  public getLabel(): string {
    return this.label;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public getId(): string {
    return this.id;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(value: string): void {
    this.url = value;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public setDisplay(value: Display): void {
    this.display = value;
  }

  public getFields(): ProfileFields[] {
    return this.fields;
  }

  public setFields(value: ProfileFields[]): void {
    this.fields = value;
  }

  public getFilters(): AbstractProfileFilter[] {
    return this.filters;
  }

  public setFilters(value: AbstractProfileFilter[]): void {
    this.filters = value;
  }

  public getReference(): ProfileReference {
    return this.reference;
  }

  public setReference(reference: ProfileReference): void {
    this.reference = reference;
  }
}
