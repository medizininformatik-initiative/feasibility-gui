import { DataSelectionProfileProfileFilter } from './DataSelectionProfileProfileFilter';
import { DataSelectionProfileProfileNode } from './DataSelectionProfileProfileNode';

export class DataSelectionProfileProfile {
  private url: string;
  private display: string;
  private fields: DataSelectionProfileProfileNode[] = [];
  private filters: DataSelectionProfileProfileFilter[] = [];

  constructor(
    url: string,
    display: string,
    fields: DataSelectionProfileProfileNode[] = [],
    filters: DataSelectionProfileProfileFilter[] = []
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

  public getFilters(): DataSelectionProfileProfileFilter[] {
    return this.filters;
  }

  public setFilters(value: DataSelectionProfileProfileFilter[]): void {
    this.filters = value;
  }
}
