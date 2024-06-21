import { AbstractConceptFilter } from './AbstractConceptFilter';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';

/**
 * Class representing a ConceptFilter.
 */
export class ConceptFilter extends AbstractConceptFilter {
  private allowedConceptUri: Array<string> = []; // Renamed from conceptSetUri
  private type: FilterTypes = FilterTypes.CONCEPT;

  /**
   * Creates an instance of ConceptFilter.
   *
   * @param allowedConceptUri - The allowed concept URI.
   * @param selectedConcepts - The selected concepts.
   * @param allowedConcepts - The allowed concepts.
   */
  constructor(
    allowedConceptUri: Array<string>,
    selectedConcepts: TerminologyCode[] = [],
    allowedConcepts: TerminologyCode[] = []
  ) {
    super(selectedConcepts, allowedConcepts);
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
}
