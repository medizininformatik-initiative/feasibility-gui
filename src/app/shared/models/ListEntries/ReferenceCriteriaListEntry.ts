import { AbstractListEntry } from './AbstractListEntry';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ReferenceCriteriaListEntry extends AbstractListEntry {
  private terminologyCode: TerminologyCode;

  /**
   * @param terminologyCode
   * @param id
   */
  constructor(terminologyCode: TerminologyCode, id: string) {
    super(id);
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
  getName(): string {
    return this.terminologyCode.getDisplay();
  }
  setName(name: string): void {
    this.terminologyCode.setDisplay(name);
  }
}
