export class CategoryEntry {
  private catId: string;
  private display: string;
  private shortDisplay = '';

  constructor(catId: string, display: string, shortDisplay: string = '') {
    this.catId = catId;
    this.display = display;
    this.shortDisplay = shortDisplay;
  }

  /**
   * @returns string
   */
  getCatId(): string {
    return this.catId;
  }

  /**
   * @param catId
   */
  setCatId(catId: string) {
    this.catId = catId;
  }

  /**
   *
   * @returns display
   */
  getDisplay(): string {
    return this.display;
  }

  /**
   * @param display
   */
  setDisplay(display: string) {
    this.display = display;
  }

  /**
   * @returns string
   */
  getShortDisplay(): string {
    return this.shortDisplay;
  }

  /**
   * @param shortDisplay
   */
  setShortDisplay(shortDisplay: string) {
    this.shortDisplay = shortDisplay;
  }
}
