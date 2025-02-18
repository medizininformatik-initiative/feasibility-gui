import { Display } from 'src/app/model/DataSelection/Profile/Display';
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
  private display: Display;
  /**
   *
   * @param availability
   * @param selectable
   * @param terminology
   * @param termcode
   * @param kdsModule
   * @param display
   * @param id
   */
  constructor(
    availability: number,
    selectable: boolean,
    terminology: string,
    termcode: string,
    kdsModule: string,
    display: Display,
    id: string,
    context: string
  ) {
    super(id);
    this.availability = availability;
    this.terminology = terminology;
    this.termcode = termcode;
    this.kdsModule = kdsModule;
    this.selectable = selectable;
    this.display = display;
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

  getDisplay(): Display {
    return this.display;
  }
  setDisplay(display: Display): void {
    this.display = display;
  }

  getContext(): string {
    return this.context;
  }
  setContext(context: string): void {
    this.context = context;
  }
}
