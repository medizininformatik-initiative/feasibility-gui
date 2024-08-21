import { AbstractProfileFilter } from './Filter/AbstractProfileFilter';
import { DataSelectionProfileProfileNode } from './DataSelectionProfileProfileNode';

export class DataSelectionProfileProfile {
  private url: string;
  private display: string;
  private fields: DataSelectionProfileProfileNode[] = [];
  private filters: AbstractProfileFilter[] = [];

  constructor(
    url: string,
    display: string,
    fields: DataSelectionProfileProfileNode[] = [],
    filters: AbstractProfileFilter[] = []
  ) {
    this.url = url;
    this.display = display;
    this.fields = fields;
    this.filters = filters;
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

  public getFields(): DataSelectionProfileProfileNode[] {
    return this.fields;
  }

  public setFields(value: DataSelectionProfileProfileNode[]): void {
    this.fields = value;
  }

  public getFilters(): AbstractProfileFilter[] {
    return this.filters;
  }

  public setFilters(value: AbstractProfileFilter[]): void {
    this.filters = value;
  }
}
