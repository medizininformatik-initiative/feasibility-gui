import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { ConceptData } from 'src/app/model/Interface/ConceptData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

/**
 * @todo the id of a concept needs to be set in the future --> can be system + code or uuid maybe
 */
export class Concept {
  private id: string;
  private hash: string;
  private display: Display;
  private terminologyCode: TerminologyCode;

  constructor(display: Display, terminologyCode: TerminologyCode) {
    this.display = display;
    this.terminologyCode = terminologyCode;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public setDisplay(display: Display) {
    this.display = display;
  }

  public getTerminologyCode(): TerminologyCode {
    return this.terminologyCode;
  }

  public setTerminologyCode(terminologyCode: TerminologyCode) {
    this.terminologyCode = terminologyCode;
  }

  public static fromJson(json: ConceptData): Concept {
    const display = Display.fromJson(json.display);
    const terminologyCode = TerminologyCode.fromJson(json.terminologyCode);
    return new Concept(display, terminologyCode);
  }
}
