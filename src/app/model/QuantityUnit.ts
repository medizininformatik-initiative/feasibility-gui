/**
 * Represents a quantity unit with a code and display name.
 */
export class QuantityUnit {
  private code: string;
  private display: string;
  private system: string;

  /**
   * Constructor to initialize the QuantityUnit with code and display.
   *
   * @param code - The code of the quantity unit.
   * @param display - The display name of the quantity unit.
   */
  constructor(code: string, display: string, system: string) {
    this.code = code;
    this.display = display;
    this.system = system;
  }

  /**
   * Gets the code of the quantity unit.
   *
   * @returns The code of the quantity unit.
   */
  getCode(): string {
    return this.code;
  }

  /**
   * Sets the code of the quantity unit.
   *
   * @param code - The new code of the quantity unit.
   */
  setCode(code: string): void {
    this.code = code;
  }

  /**
   * Gets the display name of the quantity unit.
   *
   * @returns The display name of the quantity unit.
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * Sets the display name of the quantity unit.
   *
   * @param display - The new display name of the quantity unit.
   */
  setDisplay(display: string): void {
    this.display = display;
  }

  /**
   * Gets the system name of the quantity unit.
   *
   * @returns The system name of the quantity unit.
   */
  getSystem(): string {
    return this.system;
  }

  /**
   * Sets the system name of the quantity unit.
   *
   * @param system - The new system name of the quantity unit.
   */
  setSystem(system: string): void {
    this.system = system;
  }
}
