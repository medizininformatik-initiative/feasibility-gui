import { AbstractConceptFilter } from './AbstractConceptFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

/**
 * Class representing a ConceptFilter.
 */
export class ConceptFilter extends AbstractConceptFilter {
  private allowedConceptUri: Array<string> = [];
  private type: FilterTypes = FilterTypes.CONCEPT;

  /**
   * Creates an instance of ConceptFilter.
   *
   * @param allowedConceptUri - The allowed concept URI.
   * @param selectedConcepts - The selected concepts.
   */
  constructor(allowedConceptUri: Array<string> = [], selectedConcepts: Set<TerminologyCode>) {
    super(selectedConcepts);
    this.allowedConceptUri = allowedConceptUri;
  }

  /**
   * Gets the allowed concept URI.
   *
   * @returns The allowed concept URI.
   */
  getAllowedConceptUri(): string[] {
    return this.allowedConceptUri;
  }

  /**
   * Sets the allowed concept URI.
   *
   * @param allowedConceptUri - The new allowed concept URI.
   */
  setAllowedConceptUri(allowedConceptUri: Array<string>): void {
    this.allowedConceptUri = allowedConceptUri;
  }

  /**
   * Gets the filter type.
   *
   * @returns The filter type.
   */
  getType(): FilterTypes {
    return this.type;
  }

  /**
   * Sets the filter type.
   *
   * @param type - The new filter type.
   */
  setType(type: FilterTypes): void {
    this.type = type;
  }

  /**
   * Static method to create a ConceptFilter.
   *
   * @param allowedConceptUri - The allowed concept URI.
   * @param selectedConcepts - The selected concepts.
   * @returns The created ConceptFilter instance.
   */
  static create(
    allowedConceptUri: Array<string>,
    selectedConcepts: Set<TerminologyCode>
  ): ConceptFilter {
    return new ConceptFilter(allowedConceptUri, selectedConcepts);
  }

  /**
   * Checks whether the selected concepts set exists.
   *
   * @returns True if the selected concepts set exists, otherwise false.
   */
  isSelectedConceptSet(): boolean {
    return this.selectedConcepts !== undefined && this.selectedConcepts !== null;
  }
}
