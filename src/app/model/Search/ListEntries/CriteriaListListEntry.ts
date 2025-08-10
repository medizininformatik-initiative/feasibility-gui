import { AbstractListEntry } from './AbstractListEntry';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { CriteriaListEntryData } from '../../Interface/Search/CriteriaListListEntryData';

/**
 * Represents a search term list item, extending AbstractSearchResult.
 */
export class CriteriaListEntry extends AbstractListEntry {
  private readonly selectable: boolean;
  private readonly availability: number;
  private readonly terminology: string;
  private readonly termcode: string;
  private readonly kdsModule: string;
  private readonly context: string;
  private readonly display: Display;
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
   * Gets the availability of the searchterm.
   *
   * @returns The availability as a number.
   */
  public getAvailability(): number {
    return this.availability;
  }

  /**
   * Gets the terminology of the searchterm.
   *
   * @returns The terminology as a string.
   */
  public getTerminology(): string {
    return this.terminology;
  }

  /**
   * Gets the term code of the searchterm.
   *
   * @returns The term code as a string.
   */
  public getTermcode(): string {
    return this.termcode;
  }

  /**
   * Gets the KDS module.
   *
   * @returns The KDS module as a string.
   */
  public getKdsModule(): string {
    return this.kdsModule;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public getContext(): string {
    return this.context;
  }

  public static fromJson(json: CriteriaListEntryData): CriteriaListEntry {
    return new CriteriaListEntry(
      json.availability,
      json.selectable,
      json.terminology,
      json.termcode,
      json.kdsModule,
      Display.fromJson(json.display),
      json.id,
      json.context
    );
  }
}
