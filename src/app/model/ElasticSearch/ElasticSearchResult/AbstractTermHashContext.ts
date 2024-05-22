/**
 * Represents an abstract context for a term hash, providing common properties and methods.
 */
export abstract class AbstractTermHashContext {
  name: string;
  contextualizedTermcodeHash?: string;

  /**
   * Constructs a new AbstractTermHashContext instance.
   *
   * @param name - The name of the term.
   * @param contextualizedTermcodeHash - The contextualized term code hash, optional.
   */
  constructor(name: string, contextualizedTermcodeHash?: string) {
    this.name = name;
    this.contextualizedTermcodeHash = contextualizedTermcodeHash;
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
   * Gets the contextualized term code hash.
   *
   * @returns The contextualized term code hash as a string, or undefined if not set.
   */
  getContextualizedTermcodeHash(): string | undefined {
    return this.contextualizedTermcodeHash;
  }

  /**
   * Sets the contextualized term code hash.
   *
   * @param contextualizedTermcodeHash - The new contextualized term code hash as a string, or undefined if not set.
   */
  setContextualizedTermcodeHash(contextualizedTermcodeHash: string | undefined): void {
    this.contextualizedTermcodeHash = contextualizedTermcodeHash;
  }
}
