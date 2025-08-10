import { TerminologyCodeData } from '../Interface/TerminologyCodeData';

/**
 * @todo check if uid is still needed as a class variable
 */
export class TerminologyCode {
  private code: string;
  private display: string;
  private system: string;
  private version?: string;
  private uid?: string;

  constructor(code: string, display: string, system: string, version?: string, uid?: string) {
    this.code = code;
    this.display = display;
    this.system = system;
    this.version = version;
    this.uid = uid;
  }

  /**
   * Method to check wheather a Termonolgy Code already exists
   *
   * @param other
   * @returns
   */
  public equals(other: TerminologyCode): boolean {
    return this.code === other.code && this.system === other.system;
  }

  /**
   * Getter for the 'code' property.
   *
   * @returns The code of the terminology code.
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Setter for the 'code' property.
   *
   * @param code - The new code to set.
   */
  public setCode(code: string): void {
    this.code = code;
  }

  /**
   * Getter for the 'display' property.
   *
   * @returns The display name of the terminology code.
   */
  public getDisplay(): string {
    return this.display;
  }

  /**
   * Setter for the 'display' property.
   *
   * @param display - The new display name to set.
   */
  public setDisplay(display: string): void {
    this.display = display;
  }

  /**
   * Getter for the 'system' property.
   *
   * @returns The system of the terminology code.
   */
  public getSystem(): string {
    return this.system;
  }

  /**
   * Setter for the 'system' property.
   *
   * @param system - The new system to set.
   */
  public setSystem(system: string): void {
    this.system = system;
  }

  /**
   * Getter for the 'version' property.
   *
   * @returns The version of the terminology code.
   */
  public getVersion(): string | undefined {
    return this.version;
  }

  /**
   * Setter for the 'version' property.
   *
   * @param version - The new version to set.
   */
  public setVersion(version?: string): void {
    this.version = version;
  }

  /**
   * Getter for the 'uid' property.
   *
   * @returns The UID of the terminology code.
   */
  public getUid(): string | undefined {
    return this.uid;
  }

  /**
   * Setter for the 'uid' property.
   *
   * @param uid - The new UID to set.
   */
  public setUid(uid?: string): void {
    this.uid = uid;
  }

  /**
   * Creates a TerminologyCode instance from a JSON object.
   *
   * @param json The JSON object to convert.
   * @returns The created TerminologyCode instance.
   */
  public static fromJson(json: TerminologyCodeData): TerminologyCode {
    return new TerminologyCode(json.code, json.display, json.system, json.version);
  }
}
