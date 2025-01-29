import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { v4 as uuidv4 } from 'uuid';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';

export class FilterChipConceptAdapter {
  public static conceptFilterChips: InterfaceFilterChip[] = [];

  /**
   * Adapts a ConceptFilter and optional attribute code into an array of InterfaceFilterChip.
   *
   * @param conceptFilter The ConceptFilter to adapt
   * @param attributeCode Optional TerminologyCode for additional attribute information
   * @returns An array of InterfaceFilterChip
   */
  public static adaptCodeableConcept(
    selectedConcepts: Concept[] = [],
    display?: DisplayData
  ): InterfaceFilterChip[] {
    this.resetFilterChips();

    if (selectedConcepts.length === 0) {
      console.warn('No selected concepts found in the ConceptFilter');
      return [];
    }

    this.buildFilterChips(selectedConcepts, display);

    return this.conceptFilterChips;
  }

  /**
   * Resets the conceptFilterChips array.
   */
  private static resetFilterChips(): void {
    this.conceptFilterChips = [];
  }

  /**
   * Determines the filter type.
   *
   * @param attributeCode Optional TerminologyCode
   * @returns The filter type as a string
   */
  private static getFilterType(attributeCode?: TerminologyCode): string {
    return attributeCode?.getDisplay() || FilterTypes.CONCEPT;
  }

  /**
   * @todo AttributeCode will be extended in the future by displayData --> Need to fix this
   * Retrieves the selected concepts from the ConceptFilter.
   *
   * @param conceptFilter The ConceptFilter to retrieve concepts from
   * @returns A Set of TerminologyCode or null
   */
  private static getSelectedConcepts(conceptFilter: ConceptFilter): Concept[] | null {
    return conceptFilter?.getSelectedConcepts() || null;
  }

  /**
   * Builds filter chips and adds them to the conceptFilterChips array.
   *
   * @param selectedConcepts A Set of TerminologyCode
   * @param type The filter type
   */
  private static buildFilterChips(selectedConcepts: Concept[], type: DisplayData): void {
    const builder = new FilterChipBuilder(type);
    selectedConcepts.forEach((concept) => {
      this.createFilterChip(concept, builder);
    });
    this.conceptFilterChips.push(builder.buildFilterChip());
  }

  /**
   * Creates an InterfaceFilterChip from a TerminologyCode and adds it to the builder.
   *
   * @param concept The TerminologyCode to use for creating the chip
   * @param builder The FilterChipBuilder instance
   */
  private static createFilterChip(concept: Concept, builder: FilterChipBuilder): void {
    /*const displayText = new DisplayData(
      [concept.getDisplay()],
      [
        new Translation('de-DE', [concept.getDisplay()]),
        new Translation('en-US', [concept.getDisplay()]),
      ]
    );

    if (!displayText) {
      console.warn('Concept display text is undefined or null', concept);
      return;
    }*/
    builder.addData(uuidv4(), concept.getDisplay());
  }
}
