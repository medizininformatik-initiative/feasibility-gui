import { AbstractProfileFilter } from './Filter/AbstractProfileFilter';
import { ProfileFields } from './Fields/ProfileFields';

export class DataSelectionProfileProfile {
  private id: string;
  private url: string;
  private display: string;
  private fields: ProfileFields[] = [];
  private filters: AbstractProfileFilter[] = [];

  constructor(
    id: string,
    url: string,
    display: string,
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

  public getDisplay(): string {
    return this.display;
  }

  public setDisplay(value: string): void {
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
