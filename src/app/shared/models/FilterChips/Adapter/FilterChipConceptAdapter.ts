import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export class FilterChipConceptAdapter {
  /**
   * Adapts a ConceptFilter and optional attribute code into an array of InterfaceFilterChip.
   *
   * @param conceptFilter The ConceptFilter to adapt
   * @param attributeCode Optional TerminologyCode for additional attribute information
   * @returns An array of InterfaceFilterChip
   */
  public static adaptCodeableConcept(
    conceptFilter: ConceptFilter,
    attributeCode?: TerminologyCode
  ): InterfaceFilterChip[] {
    const type = attributeCode?.getDisplay() || FilterTypes.CONCEPT;
    const selectedConcepts = conceptFilter?.getSelectedConcepts();

    if (!selectedConcepts) {
      console.warn('No selected concepts found in the ConceptFilter');
      return [];
    }

    const conceptsArray = Array.from(selectedConcepts);
    return conceptsArray
      .map((concept) => this.createFilterChip(concept, type))
      .filter((chip) => chip !== null);
  }

  /**
   * Creates an InterfaceFilterChip from a TerminologyCode.
   *
   * @param concept The TerminologyCode to use for creating the chip
   * @param type The filter type
   * @returns An InterfaceFilterChip
   */
  private static createFilterChip(
    concept: TerminologyCode,
    type: string
  ): InterfaceFilterChip | null {
    const displayText = concept.getDisplay();

    if (!displayText) {
      console.warn('Concept display text is undefined or null', concept);
      return null;
    }

    const builder = new FilterChipBuilder(type);
    builder.addData(uuidv4(), displayText);
    return builder.buildFilterChip();
  }
}
