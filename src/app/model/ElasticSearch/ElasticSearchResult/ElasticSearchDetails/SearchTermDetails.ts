import { UIProfile } from 'src/app/model/terminology/UIProfile';
import { AbstractSearchResult } from '../AbstractSearchResult';
import { AbstractTermHashContext } from '../AbstractTermHashContext';
import { SearchTermRelatives } from './SearchTermRelatives';
import { SearchTermTranslation } from './SearchTermTranslation';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';

/**
 * Represents detailed information about a search term, extending the AbstractSearchResult class.
 * Warum müssen wir hier von der Abstrakten erben?
 *
 * @see AbstractSearchResult
 */
export class SearchTermDetails extends AbstractTermHashContext {
  translations: Array<SearchTermTranslation>;
  parents: SearchTermRelatives[];
  children: SearchTermRelatives[];
  relatedTerms: SearchTermRelatives[];
  uiProfile: UIProfile;
  context: TerminologyCode;
  termCodes: TerminologyCode[];

  /**
   *
   * @param children
   * @param parents
   * @param relatedTerms
   * @param translations
   * @param name
   * @param id
   * @param uiProfile
   * @param context
   * @param termCodes
   */
  constructor(
    children: Array<SearchTermRelatives>,
    parents: Array<SearchTermRelatives>,
    relatedTerms: Array<SearchTermRelatives>,
    translations: Array<SearchTermTranslation>,
    name: string,
    id: string,
    uiProfile: UIProfile,
    context: TerminologyCode,
    termCodes: TerminologyCode[]
  ) {
    super(name, id);
    this.translations = translations;
    this.parents = parents;
    this.children = children;
    this.relatedTerms = relatedTerms;
    this.uiProfile = uiProfile;
    this.context = context;
    this.termCodes = termCodes;
  }

  /**
   * Gets the parent terms.
   *
   * @returns An array of parent terms.
   */
  getParents(): SearchTermRelatives[] {
    return this.parents;
  }

  /**
   * Sets the parent terms.
   *
   * @param parents - An array of new parent terms.
   */
  setParents(parents: SearchTermRelatives[]): void {
    this.parents = parents;
  }

  /**
   * Gets the child terms.
   *
   * @returns An array of child terms.
   */
  getChildren(): SearchTermRelatives[] {
    return this.children;
  }

  /**
   * Sets the child terms.
   *
   * @param children - An array of new child terms.
   */
  setChildren(children: SearchTermRelatives[]): void {
    this.children = children;
  }

  /**
   * Gets the related terms.
   *
   * @returns An array of related terms.
   */
  getRelatedTerms(): SearchTermRelatives[] {
    return this.relatedTerms;
  }

  /**
   * Sets the related terms.
   *
   * @param relatedTerms - An array of new related terms.
   */
  setRelatedTerms(relatedTerms: SearchTermRelatives[]): void {
    this.relatedTerms = relatedTerms;
  }
}
