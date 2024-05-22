import { AbstractSearchResult } from '../AbstractSearchResult';

/**
 * Represents a search term list item, extending AbstractSearchResult.
 *
 * @see AbstractSearchResult
 */
export class SearchTermListItem extends AbstractSearchResult {
  /**
   * Constructs a new SearchTermListItem instance.
   *
   * @param availability - The availability of the term.
   * @param domain - The domain of the term.
   * @param terminology - The terminology of the term.
   * @param termcode - The term code.
   * @param kdsModule - The KDS module.
   */
  constructor(
    availability: number,
    domain: string,
    terminology: string,
    termcode: string,
    kdsModule: string,
    name: string,
    contextualizedTermcodeHash: string
  ) {
    super(name, contextualizedTermcodeHash, availability, domain, terminology, termcode, kdsModule);
  }
}
