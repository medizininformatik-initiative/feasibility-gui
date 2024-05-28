import { AbstractTermHashContext } from '../AbstractTermHashContext';
import { SearchTermTranslation } from './SearchTermTranslation';

/**
 * Represents the relatives (parents, children, related terms) and translations of a search term.
 */
export class SearchTermRelatives extends AbstractTermHashContext {
  translations: Array<SearchTermTranslation>;
  parents: SearchTermRelatives[];
  children: SearchTermRelatives[];
  relatedTerms: SearchTermRelatives[];

  /**
   * Constructs a new SearchTermRelatives instance.
   *
   * @param children - The child terms of this search term.
   * @param parents - The parent terms of this search term.
   * @param relatedTerms - The related terms of this search term.
   * @param translations - The translations of this search term.
   */
  constructor(
    children: Array<SearchTermRelatives>,
    parents: Array<SearchTermRelatives>,
    relatedTerms: Array<SearchTermRelatives>,
    translations: Array<SearchTermTranslation>,
    name: string,
    contextualizedTermcodeHash: string
  ) {
    super(name, contextualizedTermcodeHash);
    this.translations = translations;
    this.parents = parents;
    this.children = children;
    this.relatedTerms = relatedTerms;
  }

  /**
   * Gets the parent terms of this search term.
   *
   * @returns An array of parent terms.
   */
  getParents(): SearchTermRelatives[] {
    return this.parents;
  }

  /**
   * Sets the parent terms of this search term.
   *
   * @param parents - An array of new parent terms.
   */
  setParents(parents: SearchTermRelatives[]): void {
    this.parents = parents;
  }

  /**
   * Gets the child terms of this search term.
   *
   * @returns An array of child terms.
   */
  getChildren(): SearchTermRelatives[] {
    return this.children;
  }

  /**
   * Sets the child terms of this search term.
   *
   * @param children - An array of new child terms.
   */
  setChildren(children: SearchTermRelatives[]): void {
    this.children = children;
  }

  /**
   * Gets the related terms of this search term.
   *
   * @returns An array of related terms.
   */
  getRelatedTerms(): SearchTermRelatives[] {
    return this.relatedTerms;
  }

  /**
   * Sets the related terms of this search term.
   *
   * @param relatedTerms - An array of new related terms.
   */
  setRelatedTerms(relatedTerms: SearchTermRelatives[]): void {
    this.relatedTerms = relatedTerms;
  }
}
