import { AbstractTermHashContext } from './AbstractTermHashContext';

/**
 * Represents an abstract search result, extending AbstractTermHashContext.
 */
export abstract class AbstractSearchResult extends AbstractTermHashContext {
  availability: number;
  terminology: string;
  termcode: string;
  kdsModule: string;

  /**
   * Constructs a new AbstractSearchResult instance.
   *
   * @param availability - The availability of the term.
   * @param terminology - The terminology of the term.
   * @param termcode - The term code.
   * @param kdsModule - The KDS module.
   * @param name
   * @param id
   */
  constructor(
    name: string,
    id: string,
    availability: number,
    terminology: string,
    termcode: string,
    kdsModule: string
  ) {
    super(name, id);
    this.availability = availability;
    this.terminology = terminology;
    this.termcode = termcode;
    this.kdsModule = kdsModule;
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
}
