class SearchTermRelatives extends AbstractTermHashContext {
  translations: Array<SearchTermTranslation>;
  parents: SearchTermRelatives[];
  children: SearchTermRelatives[];
  relatedTerms: SearchTermRelatives[];

  constructor(
    children: Array<SearchTermRelatives>,
    parents: Array<SearchTermRelatives>,
    relatedTerms: Array<SearchTermRelatives>,
    translations: Array<SearchTermTranslation>
  ) {
    super();
    this.translations = translations;
    this.parents = parents;
    this.children = children;
    this.relatedTerms = relatedTerms;
  }

  getParents(): SearchTermRelatives[] {
    return this.parents;
  }

  setParents(parents: SearchTermRelatives[]): void {
    this.parents = parents;
  }

  getChildren(): SearchTermRelatives[] {
    return this.children;
  }

  setChildren(children: SearchTermRelatives[]): void {
    this.children = children;
  }

  getRelatedTerms(): SearchTermRelatives[] {
    return this.children;
  }

  setRelatedTerms(children: SearchTermRelatives[]): void {
    this.children = children;
  }
}
