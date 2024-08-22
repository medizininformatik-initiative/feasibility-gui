import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

/**
 * Abstract class representing a concept filter.
 */
export abstract class AbstractConceptFilter {
  // Needs to be tested if set works for handling unique elements??
  protected selectedConcepts: Set<TerminologyCode> = new Set([]);

  /**
   * Creates an instance of AbstractConceptFilter.
   *
   * @param selectedConcepts - The selected concepts.
   * @param allowedConcepts - The allowed concepts.
   */
  constructor(selectedConcepts: Set<TerminologyCode>) {
    this.selectedConcepts = selectedConcepts;
  }

  /**
   * Gets the selected concepts.
   *
   * @returns A Set of selected concepts.
   */
  getSelectedConcepts(): Set<TerminologyCode> {
    return this.selectedConcepts;
  }

  /**
   * Sets the selected concepts.
   *
   * @param selectedConcepts - A Set of selected concepts.
   */
  setSelectedConcepts(selectedConcepts: Set<TerminologyCode>): void {
    this.selectedConcepts = selectedConcepts;
  }

  /**
   * Checks whether the selected concepts set exists.
   *
   * @returns True if the selected concepts set exists, otherwise false.
   */
  isSelectedConceptSet(): boolean {
    return (
      this.selectedConcepts !== undefined &&
      this.selectedConcepts !== null &&
      this.selectedConcepts.size > 0
    );
  }
}
