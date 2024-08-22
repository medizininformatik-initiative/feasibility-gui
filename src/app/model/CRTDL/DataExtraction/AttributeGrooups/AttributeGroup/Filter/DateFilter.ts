import { AbstractAttributeGroupFilter } from '../AbstractAttributeGroupFilter';

export class DateFilter extends AbstractAttributeGroupFilter {
  start?: string;
  end?: string;

  constructor(name: string, type: string, start?: string, end?: string) {
    super(type, name);
    this.start = start;
    this.end = end;
  }
}
