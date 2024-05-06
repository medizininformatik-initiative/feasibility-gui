import { TerminologyCode } from './Terminology';

export class TerminologyEntry {
  private children: TerminologyEntry[] = [];
  private context?: TerminologyCode;
  private display: string;
  private entity = false;
  private id: string;
  private leaf = false;
  private optional = false;
  private selectable = true;
  private selected = false;
  private termCodes: TerminologyCode[] = [];
  private timeRestrictionAllowed = true;

  /**
   * @param children
   * @param display
   * @param id
   * @param context
   * @param entity
   * @param leaf
   * @param optional
   * @param selectable
   * @param selected
   * @param termCodes
   * @param timeRestrictionAllowed
   */
  constructor(
    children: TerminologyEntry[] = [],
    display: string,
    id: string,
    context?: TerminologyCode,
    entity: boolean = false,
    leaf: boolean = false,
    optional: boolean = false,
    selectable: boolean = true,
    selected: boolean = false,
    termCodes: TerminologyCode[] = [],
    timeRestrictionAllowed: boolean = true
  ) {
    this.children = children;
    this.display = display;
    this.id = id;
    this.context = context;
    this.entity = entity;
    this.leaf = leaf;
    this.optional = optional;
    this.selectable = selectable;
    this.selected = selected;
    this.termCodes = termCodes;
    this.timeRestrictionAllowed = timeRestrictionAllowed;
  }

  /**
   *
   * @returns The children
   */
  getChildren(): TerminologyEntry[] {
    return this.children;
  }

  /**
   * @param children
   */
  setChildren(children: TerminologyEntry[]) {
    this.children = children;
  }

  /**
   * Retrieves the display name.
   *
   * @returns The display name.
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * Sets the display name.
   *
   * @param display - The display name to set.
   */
  setDisplay(display: string) {
    this.display = display;
  }

  /**
   * Retrieves the unique identifier.
   *
   * @returns The unique identifier.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Sets the unique identifier.
   *
   * @param id - The unique identifier to set.
   */
  setId(id: string) {
    this.id = id;
  }

  /**
   * Retrieves the context terminology code.
   *
   * @returns The context terminology code.
   */
  getContext(): TerminologyCode | undefined {
    return this.context;
  }

  /**
   * Sets the context terminology code.
   *
   * @param context - The context terminology code to set.
   */
  setContext(context: TerminologyCode | undefined) {
    this.context = context;
  }

  /**
   * Retrieves whether the entry represents an entity.
   *
   * @returns Whether the entry represents an entity.
   */
  getEntity(): boolean {
    return this.entity;
  }

  /**
   * Sets whether the entry represents an entity.
   *
   * @param entity - Whether the entry represents an entity.
   */
  setEntity(entity: boolean) {
    this.entity = entity;
  }

  /**
   * Retrieves whether the entry is a leaf node.
   *
   * @returns Whether the entry is a leaf node.
   */
  public getLeaf(): boolean {
    return this.leaf;
  }

  /**
   * Sets whether the entry is a leaf node.
   *
   * @param leaf - Whether the entry is a leaf node.
   */
  setLeaf(leaf: boolean) {
    this.leaf = leaf;
  }

  /**
   * Retrieves whether the entry is optional.
   *
   * @returns Whether the entry is optional.
   */
  getOptional(): boolean {
    return this.optional;
  }

  /**
   * Sets whether the entry is optional.
   *
   * @param optional - Whether the entry is optional.
   */
  setOptional(optional: boolean) {
    this.optional = optional;
  }

  /**
   * Retrieves whether the entry is selectable.
   *
   * @returns Whether the entry is selectable.
   */
  getSelectable(): boolean {
    return this.selectable;
  }

  /**
   * Sets whether the entry is selectable.
   *
   * @param selectable - Whether the entry is selectable.
   */
  setSelectable(selectable: boolean) {
    this.selectable = selectable;
  }

  /**
   * Retrieves whether the entry is selected.
   *
   * @returns Whether the entry is selected.
   */
  getSelected(): boolean {
    return this.selected;
  }

  /**
   * Sets whether the entry is selected.
   *
   * @param selected - Whether the entry is selected.
   */
  setSelected(selected: boolean) {
    this.selected = selected;
  }

  /**
   * Retrieves the list of terminology codes associated with the entry.
   *
   * @returns The list of terminology codes associated with the entry.
   */
  getTermCodes(): TerminologyCode[] {
    return this.termCodes;
  }

  /**
   * Sets the list of terminology codes associated with the entry.
   *
   * @param termCodes - The list of terminology codes to set.
   */
  setTermCodes(termCodes: TerminologyCode[]) {
    this.termCodes = termCodes;
  }

  /**
   * Retrieves whether time restriction is allowed.
   *
   * @returns Whether time restriction is allowed.
   */
  getTimeRestrictionAllowed(): boolean {
    return this.timeRestrictionAllowed;
  }

  /**
   * Sets whether time restriction is allowed.
   *
   * @param timeRestrictionAllowed - Whether time restriction is allowed.
   */
  setTimeRestrictionAllowed(timeRestrictionAllowed: boolean) {
    this.timeRestrictionAllowed = timeRestrictionAllowed;
  }
}
