import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class Concept {
  display: DisplayData;
  terminologyCode: TerminologyCode;

  constructor(display: DisplayData, terminologyCode: TerminologyCode) {
    this.display = display;
    this.terminologyCode = terminologyCode;
  }

  public getDisplay(): DisplayData {
    return this.display;
  }

  public setDisplay(display: DisplayData) {
    this.display = display;
  }

  public getTerminologyCode(): TerminologyCode {
    return this.terminologyCode;
  }

  public setTerminologyCode(terminologyCode: TerminologyCode) {
    this.terminologyCode = terminologyCode;
  }
}
