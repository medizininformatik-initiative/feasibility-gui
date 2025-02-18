import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { AbstractListEntry } from './AbstractListEntry';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ReferenceCriteriaListEntry extends AbstractListEntry {
  private display: Display;
  private terminologyCode: TerminologyCode;

  /**
   * @param terminologyCode
   * @param id
   */
  constructor(display: Display, terminologyCode: TerminologyCode, id: string) {
    super(id);
    this.display = display;
    this.terminologyCode = terminologyCode;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public setDisplay(display: Display): void {
    this.display = display;
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
