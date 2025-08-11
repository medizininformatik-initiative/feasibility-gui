import { Display } from '../../DataSelection/Profile/Display';
import { CriteriaRelativeData } from '../../Interface/CriteriaRelativesData';

/**
 * Represents the relatives (parents, children, related terms) and translations of a search term.
 */
export class SearchTermRelatives {
  private display: Display;
  private readonly contextualizedTermcodeHash: string;
  constructor(display: Display, contextualizedTermcodeHash: string) {
    this.display = display;
    this.contextualizedTermcodeHash = contextualizedTermcodeHash;
  }

  public getDisplay(): Display {
    return this.display;
  }

  /**
   * Sets the display of the term.
   *
   * @param display - The new display of the term.
   */
  public setDisplay(display: Display): void {
    this.display = display;
  }

  /**
   * Gets the contextualized term code hash.
   *
   * @returns The contextualizedTermcodeHash as a string, or undefined if not set.
   */
  public getContextualizedTermcodeHash(): string | undefined {
    return this.contextualizedTermcodeHash;
  }

  public static fromJson(json: CriteriaRelativeData): SearchTermRelatives {
    const display = Display.fromJson(json.display);
    const contextualizedTermcodeHash = json.contextualizedTermcodeHash;
    return new SearchTermRelatives(display, contextualizedTermcodeHash);
  }
}
