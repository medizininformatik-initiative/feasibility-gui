import { AbstractConceptFilter } from '../../Abstract/ConceptFilter/AbstractConceptFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ConceptAttributeFilter extends AbstractConceptFilter {
  private attributeCode: TerminologyCode;

  constructor(attributeCode: TerminologyCode, selectedConcepts: TerminologyCode[] = []) {
    super(selectedConcepts);
    this.attributeCode = attributeCode;
  }

  /**
   * Gets the attributeCode value.
   *
   * @returns The attributeCode value.
   */
  public getAttributeCode(): TerminologyCode {
    return this.attributeCode;
  }

  /**
   * Sets the attributeCode value.
   *
   * @param attributeCode - The new attributeCode value to set.
   */
  public setAttributeCode(attributeCode: TerminologyCode): void {
    this.attributeCode = attributeCode;
  }

  public static createFilter(attributeCode: TerminologyCode, selectedConcepts: TerminologyCode[]) {
    return new ConceptAttributeFilter(attributeCode, Array.from(selectedConcepts));
  }
}
