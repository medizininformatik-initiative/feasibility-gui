/**
 * Represents an abstract context for a term hash, providing common properties and methods.
 */
export abstract class AbstractTermHashContext {
  name: string;
  id?: string;

  /**
   * Constructs a new AbstractTermHashContext instance.
   *
   * @param name - The name of the term.
   * @param id - The contextualized term code hash, optional.
   */
  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id;
  }

  /**
   * Gets the name of the term.
   *
   * @returns The name of the term as a string.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the term.
   *
   * @param name - The new name of the term as a string.
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Gets the id.
   *
   * @returns The id as a string, or undefined if not set.
   */
  getId(): string | undefined {
    return this.id;
  }

  /**
   * Sets the contextualized term code hash.
   *
   * @param id - The new contextualized term code hash as a string, or undefined if not set.
   */
  setId(id: string | undefined): void {
    this.id = id;
  }
}
