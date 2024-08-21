import { AbstractAttributeGroupFilter } from '../AbstractAttributeGroupFilter';
import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';

export class DateFilter extends AbstractAttributeGroupFilter {
  start?: string;
  end?: string;

  constructor(name: string, start?: string, end?: string) {
    super(CRTDLFilterTypes.DATE, name);
    this.start = start;
    this.end = end;
  }
}
