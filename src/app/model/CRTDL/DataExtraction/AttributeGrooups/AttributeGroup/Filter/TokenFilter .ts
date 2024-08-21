import { AbstractAttributeGroupFilter } from '../AbstractAttributeGroupFilter';
import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class TokenFilter extends AbstractAttributeGroupFilter {
  codes: TerminologyCode[];

  constructor(name: string, codes?: TerminologyCode[]) {
    super(CRTDLFilterTypes.TOKEN, name);
    this.codes = codes;
  }
}
