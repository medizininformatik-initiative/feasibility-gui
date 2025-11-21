import { ConceptData } from '../../Interface/ConceptData';
import { Display } from '../../DataSelection/Profile/Display';
import { TerminologyCode } from '../../Terminology/TerminologyCode';

export class CodeableConceptBulkEntry {
  private readonly id: string;
  private readonly display: Display;
  private readonly termCode: TerminologyCode;
  constructor(id: string, display: Display, termCode: TerminologyCode) {
    this.id = id;
    this.display = display;
    this.termCode = termCode;
  }

  /**
   * Returns the unique identifier of this codeable concept.
   * @returns
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Retunrs the display information of this codeable concept.
   * @returns
   */
  public getDisplay(): Display {
    return this.display;
  }

  /**
   * Returns the term code associated with this codeable concept.
   * @returns
   */
  public getTermCode(): TerminologyCode {
    return this.termCode;
  }

  /**
   * Creates an instance of CodeableConceptBulkEntry from a JSON object.
   * @param json
   * @returns
   */
  public static fromJson(json: ConceptData): CodeableConceptBulkEntry {
    return new CodeableConceptBulkEntry(
      json.id,
      Display.fromJson(json.display),
      TerminologyCode.fromJson(json.termCode)
    );
  }
}
