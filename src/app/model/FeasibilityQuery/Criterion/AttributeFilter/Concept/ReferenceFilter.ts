import { AbstractConceptFilter } from './AbstractConceptFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { ReferenceCriterion } from '../../ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Concept } from './Concept';

/**
 * Class representing a ReferenceFilter.
 */
export class ReferenceFilter extends AbstractConceptFilter {
  private selectedReferences: ReferenceCriterion[] = [];
  private allowedReferenceUri: string;
  private type: FilterTypes = FilterTypes.REFERENCE;

  /**
   * Creates an instance of ReferenceFilter.
   *
   * @param selectedReferences - The selected reference criteria.
   * @param allowedReferenceUri - The allowed reference URI.
   * @param selectedConcepts - The selected concepts (inherited from AbstractConceptFilter).
   */
  constructor(
    id: string,
    allowedReferenceUri: string,
    selectedReferences: ReferenceCriterion[] = [],
    selectedConcepts: Concept[]
  ) {
    super(id, selectedConcepts);
    this.selectedReferences = selectedReferences;
    this.allowedReferenceUri = allowedReferenceUri;
  }

  /**
   * Gets the selected reference criteria.
   *
   * @returns An array of selected reference criteria.
   */
  getSelectedReferences(): ReferenceCriterion[] {
    return this.selectedReferences;
  }

  /**
   * Sets the selected reference criteria.
   *
   * @param selectedReferences - An array of selected reference criteria.
   */
  setSelectedReferences(selectedReferences: ReferenceCriterion[]): void {
    this.selectedReferences = selectedReferences;
  }

  /**
   * Gets the allowed reference URI.
   *
   * @returns The allowed reference URI.
   */
  getAllowedReferenceUri(): string {
    return this.allowedReferenceUri;
  }

  /**
   * Sets the allowed reference URI.
   *
   * @param allowedReferenceUri - The allowed reference URI to set.
   */
  setAllowedReferenceUri(allowedReferenceUri: string): void {
    this.allowedReferenceUri = allowedReferenceUri;
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
   * Static method to create a ReferenceFilter.
   *
   * @param allowedReferenceUri - The allowed reference URI.
   * @param selectedReference - The selected reference criteria.
   * @param selectedConcepts - The selected concepts.
   * @returns The created ReferenceFilter instance.
   */
  static create(
    id: string,
    allowedReferenceUri: string,
    selectedReference: ReferenceCriterion[] = [],
    selectedConcepts: Concept[]
  ): ReferenceFilter {
    return new ReferenceFilter(id, allowedReferenceUri, selectedReference, selectedConcepts);
  }

  isSelectedReferenceSet(): boolean {
    return (
      this.selectedReferences !== undefined &&
      this.selectedReferences !== null &&
      this.selectedReferences.length > 0
    );
  }
}
