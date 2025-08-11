import { Display } from '../../DataSelection/Profile/Display';
import { CriteriaRelationsData } from '../../Interface/CriteriaRelationsData';
import { SearchTermRelatives } from './SearchTermRelatives';

/**
 * Represents detailed information about a search term, extending the AbstractSearchResult class.
 * Warum müssen wir hier von der Abstrakten erben?
 *
 * @see AbstractSearchResult
 */
export class SearchTermDetails {
  private readonly display: Display;
  private readonly parents: SearchTermRelatives[];
  private readonly children: SearchTermRelatives[];

  /**
   *
   * @param children
   * @param parents
   * @param display
   */
  constructor(
    children: Array<SearchTermRelatives>,
    parents: Array<SearchTermRelatives>,
    display: Display
  ) {
    this.display = display;
    this.parents = parents;
    this.children = children;
  }

  /**
   * Gets the parent terms.
   *
   * @returns An array of parent terms.
   */
  public getParents(): SearchTermRelatives[] {
    return this.parents;
  }

  /**
   * Gets the child terms.
   *
   * @returns An array of child terms.
   */
  public getChildren(): SearchTermRelatives[] {
    return this.children;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public static fromJson(json: CriteriaRelationsData): SearchTermDetails {
    const display = Display.fromJson(json.display);
    const parents = json.parents.map(SearchTermRelatives.fromJson);
    const children = json.children.map(SearchTermRelatives.fromJson);
    return new SearchTermDetails(children, parents, display);
  }
}
