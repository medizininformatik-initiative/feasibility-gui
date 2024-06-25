import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { AbstractListEntry } from './AbstractListEntry';

export class SearchTermValueSetEntry extends AbstractListEntry {
  private terminologyCode: TerminologyCode;

  /**
   * @param terminologyCode
   * @param id
   */
  constructor(terminologyCode: TerminologyCode, id: string) {
    super(terminologyCode.getDisplay(), id);
    this.terminologyCode = terminologyCode;
  }

  /**
   * @returns
   */
  getTerminologyCode(): TerminologyCode {
    return this.terminologyCode;
  }

  /**
   * @param terminologyCode
   */
  setTerminologyCode(terminologyCode: TerminologyCode) {
    this.terminologyCode = terminologyCode;
  }
}
