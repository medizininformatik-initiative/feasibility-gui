import { TerminologyCode } from '../Terminology/TerminologyCode';
import { AttributeDefinitions } from '../AttributeDefinitions';

/**
 * Represents criteria profile data.
 */
export class CriteriaProfileData {
  private attributeDefinitions: Array<AttributeDefinitions>;
  private context: TerminologyCode;
  private termCodes: TerminologyCode[];
  private id: string;
  private timeRestrictionAllowed = false;

  /**
   * Constructs a new CriteriaProfileData object.
   *
   * @param attributeDefinitions - The UI profile.
   * @param context - The terminology context.
   * @param termCodes - The terminology codes.
   */
  constructor(
    id: string,
    timeRestrictionAllowed: boolean,
    attributeDefinitions: Array<AttributeDefinitions>,
    context: TerminologyCode,
    termCodes: TerminologyCode[]
  ) {
    this.attributeDefinitions = attributeDefinitions;
    this.context = context;
    this.termCodes = termCodes;
    this.id = id;
    this.timeRestrictionAllowed = timeRestrictionAllowed;
  }

  /**
   *
   * @returns The id
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Sets the id
   *
   * @param id
   */
  public setId(id: string) {
    this.id = id;
  }

  /**
   * Gets the UI profile.
   *
   * @returns The UI profile.
   */
  public getAttributeDefinitions(): AttributeDefinitions[] {
    return this.attributeDefinitions;
  }

  /**
   * Sets the UI profile.
   *
   * @param uiProfile - The UI profile to set.
   */
  public setUiProfile(attributeDefinitions: AttributeDefinitions[]): void {
    this.attributeDefinitions = attributeDefinitions;
  }

  /**
   * Gets the terminology context.
   *
   * @returns The terminology context.
   */
  public getContext(): TerminologyCode {
    return this.context;
  }

  /**
   * Sets the terminology context.
   *
   * @param context - The terminology context to set.
   */
  public setContext(context: TerminologyCode): void {
    this.context = context;
  }

  /**
   * Gets the terminology codes.
   *
   * @returns The terminology codes.
   */
  public getTermCodes(): TerminologyCode[] {
    return this.termCodes;
  }

  /**
   * Sets the terminology codes.
   *
   * @param termCodes - The terminology codes to set.
   */
  public setTermCodes(termCodes: TerminologyCode[]): void {
    this.termCodes = termCodes;
  }

  /**
   * Get whether time restriction is allowed
   *
   * @returns True if time restriction is allowed, otherwise false
   */
  getTimeRestrictionAllowed(): boolean {
    return this.timeRestrictionAllowed;
  }

  /**
   * Set whether time restriction is allowed
   *
   * @param timeRestrictionAllowed - True if time restriction is allowed, otherwise false
   */
  setTimeRestrictionAllowed(timeRestrictionAllowed: boolean): void {
    this.timeRestrictionAllowed = timeRestrictionAllowed;
  }
}