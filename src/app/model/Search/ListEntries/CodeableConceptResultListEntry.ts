import { CodeableConceptResultListEntryData } from '../../Interface/Search/CodeableConceptResultListEntryData';
import { AbstractListEntry } from './AbstractListEntry';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';

export class CodeableConceptResultListEntry extends AbstractListEntry {
  private isSelected = false;
  private concept: Concept;

  /**
   * @param concept
   * @param id
   */
  constructor(concept: Concept, id: string, isSelected: boolean = false) {
    super(id);
    this.concept = concept;
    this.isSelected = isSelected;
  }

  /**
   * @returns
   */
  public getIsSelected(): boolean {
    return this.isSelected;
  }

  /**
   * @param isSelected
   */
  public setIsSelected(isSelected: boolean) {
    this.isSelected = isSelected;
  }

  /**
   * @returns
   */
  public getConcept(): Concept {
    return this.concept;
  }

  /**
   * @param concept
   */
  public setConcept(concept: Concept) {
    this.concept = concept;
  }

  public static fromJson(json: CodeableConceptResultListEntryData): CodeableConceptResultListEntry {
    return new CodeableConceptResultListEntry(
      Concept.fromJson({
        display: json.display,
        terminologyCode: json.termCode,
      }),
      json.id
    );
  }
}
