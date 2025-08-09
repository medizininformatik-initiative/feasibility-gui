import { AbstractTermHashContext } from '../AbstractTermHashContext';
import { Display } from '../../../DataSelection/Profile/Display';

/**
 * Represents the relatives (parents, children, related terms) and translations of a search term.
 */
export class SearchTermRelatives {
  name: Display;
  private readonly termCodeHash: string;
  constructor(name: Display, termCodeHash: string) {
    this.name = name;
    this.termCodeHash = termCodeHash;
  }

  getName(): Display {
    return this.name;
  }

  /**
   * Sets the name of the term.
   *
   * @param name - The new name of the term as a string.
   */
  setName(name: Display): void {
    this.name = name;
  }

  /**
   * Gets the termCodeHash.
   *
   * @returns The termCodeHash as a string, or undefined if not set.
   */
  getTermCodeHash(): string | undefined {
    return this.termCodeHash;
  }
}
