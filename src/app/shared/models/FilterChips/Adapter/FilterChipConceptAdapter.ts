import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export class FilterChipConceptAdapter {
  public static adaptCodeableConcept(
    conceptFilter: ConceptFilter,
    attributeCode?: TerminologyCode
  ): InterfaceFilterChip[] {
    const filterChips: InterfaceFilterChip[] = [];
    const type = attributeCode?.getDisplay() || FilterTypes.CONCEPT;
    const selectedConcepts = conceptFilter?.getSelectedConcepts();

    if (selectedConcepts) {
      selectedConcepts.forEach((concept: TerminologyCode) => {
        const displayText = concept.getDisplay();
        if (displayText) {
          const builder = new FilterChipBuilder(type);
          builder.addData(uuidv4(), displayText);
          filterChips.push(builder.buildFilterChip());
        } else {
          console.warn('Concept display text is undefined or null', concept);
        }
      });
    } else {
      console.warn('No selected concepts found', conceptFilter);
    }
    return filterChips;
  }
}
