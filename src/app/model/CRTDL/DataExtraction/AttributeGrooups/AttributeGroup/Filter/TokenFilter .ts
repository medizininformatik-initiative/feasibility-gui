import { AbstractAttributeGroupFilter } from '../AbstractAttributeGroupFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class TokenFilter extends AbstractAttributeGroupFilter {
  codes: TerminologyCode[];

  constructor(name: string, type: string, codes?: TerminologyCode[]) {
    super(type, name);
    this.codes = codes;
  }
}
