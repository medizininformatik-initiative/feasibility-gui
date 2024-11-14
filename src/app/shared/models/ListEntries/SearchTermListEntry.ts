import { AbstractListEntry } from './AbstractListEntry';

/**
 * Represents a search term list item, extending AbstractSearchResult.
 *
 * @see AbstractSearchResult
 */
export class SearchTermListEntry extends AbstractListEntry {
  private selectable = true;
  private availability: number;
  private terminology: string;
  private termcode: string;
  private kdsModule: string;
  private context: string;
  private name: string;
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
    id: string,
    context: string
  ) {
    super(id);
    this.availability = availability;
    this.terminology = terminology;
    this.termcode = termcode;
    this.kdsModule = kdsModule;
    this.selectable = selectable;
    this.name = name;
    this.context = context;
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

  /**
   * Gets the availability of the searchterm.
   *
   * @returns The availability as a number.
   */
  getAvailability(): number {
    return this.availability;
  }

  /**
   * Sets the availability of the searchterm.
   *
   * @param availability - The new availability as a number.
   */
  setAvailability(availability: number): void {
    this.availability = availability;
  }

  /**
   * Gets the terminology of the searchterm.
   *
   * @returns The terminology as a string.
   */
  getTerminology(): string {
    return this.terminology;
  }

  /**
   * Sets the terminology of the searchterm.
   *
   * @param terminology - The new terminology as a string.
   */
  setTerminology(terminology: string): void {
    this.terminology = terminology;
  }

  /**
   * Gets the term code of the searchterm.
   *
   * @returns The term code as a string.
   */
  getTermcode(): string {
    return this.termcode;
  }

  /**
   * Sets the term code.
   *
   * @param termcode - The new term code as a string.
   */
  setTermcode(termcode: string): void {
    this.termcode = termcode;
  }

  /**
   * Gets the KDS module.
   *
   * @returns The KDS module as a string.
   */
  getKdsModule(): string {
    return this.kdsModule;
  }

  /**
   * Sets the KDS module.
   *
   * @param kdsModule - The new KDS module as a string.
   */
  setKdsModule(kdsModule: string): void {
    this.kdsModule = kdsModule;
  }

  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }

  getContext(): string {
    return this.context;
  }
  setContext(context: string): void {
    this.context = context;
  }
}
