import { AbstractSearchResult } from '../AbstractSearchResult';

/**
 * Represents a search term list item, extending AbstractSearchResult.
 *
 * @see AbstractSearchResult
 */
export class SearchTermListEntry extends AbstractSearchResult {
  private selectable = true;
  /**
   *
   * @param availability
   * @param selectable
   * @param terminology
   * @param termcode
   * @param kdsModule
   * @param name
   * @param id
   */
  constructor(
    availability: number,
    selectable: boolean,
    terminology: string,
    termcode: string,
    kdsModule: string,
    name: string,
    id: string
  ) {
    super(name, id, availability, terminology, termcode, kdsModule);
    this.selectable = selectable;
  }

  /**
   *
   * @returns if the Item is selectable
   */
  getSelectable() {
    return this.selectable;
  }

  /**
   *
   * @param isSelectable
   */
  setSelectable(isSelectable: boolean) {
    this.selectable = isSelectable;
  }
}
