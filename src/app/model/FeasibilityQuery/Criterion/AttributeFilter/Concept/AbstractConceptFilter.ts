import { TerminologyCode } from 'src/app/model/terminology/Terminology';

/**
 * Abstract class representing a concept filter.
 */
export abstract class AbstractConceptFilter {
  protected selectedConcepts: TerminologyCode[] = [];
  protected allowedConcepts: TerminologyCode[] = [];

  /**
   * Creates an instance of AbstractConceptFilter.
   *
   * @param selectedConcepts - The selected concepts.
   * @param allowedConcepts - The allowed concepts.
   */
  constructor(selectedConcepts: TerminologyCode[] = [], allowedConcepts: TerminologyCode[] = []) {
    this.selectedConcepts = selectedConcepts;
    this.allowedConcepts = allowedConcepts;
  }

  /**
   * Gets the selected concepts.
   *
   * @returns An array of selected concepts.
   */
  getSelectedConcepts(): TerminologyCode[] {
    return this.selectedConcepts;
  }

  /**
   * Sets the selected concepts.
   *
   * @param selectedConcepts - An array of selected concepts.
   */
  setSelectedConcepts(selectedConcepts: TerminologyCode[]): void {
    this.selectedConcepts = selectedConcepts;
  }

  /**
   * Gets the allowed concepts.
   *
   * @returns An array of allowed concepts.
   */
  getAllowedConcepts(): TerminologyCode[] {
    return this.allowedConcepts;
  }

  /**
   * Sets the allowed concepts.
   *
   * @param allowedConcepts - An array of allowed concepts.
   */
  setAllowedConcepts(allowedConcepts: TerminologyCode[]): void {
    this.allowedConcepts = allowedConcepts;
  }
}
