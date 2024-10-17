import { AbstractProfileFilter } from './Filter/AbstractProfileFilter';
import { ProfileFields } from './Fields/ProfileFields';
import { DisplayData } from './DisplayData';
import { TranslateService } from '@ngx-translate/core';

export class DataSelectionProfileProfile {
  private id: string;
  private url: string;
  private display: DisplayData;
  private fields: ProfileFields[] = [];
  private filters: AbstractProfileFilter[] = [];

  constructor(
    id: string,
    url: string,
    display: DisplayData,
    fields: ProfileFields[] = [],
    filters: AbstractProfileFilter[] = []
  ) {
    this.id = id;
    this.url = url;
    this.display = display;
    this.fields = fields;
    this.filters = filters;
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

  public getDisplay(): DisplayData {
    return this.display;
  }

  public setDisplay(value: DisplayData): void {
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
}
