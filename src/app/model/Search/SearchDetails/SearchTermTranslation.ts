/**
 * Represents a translation for a search term.
 */
export class SearchTermTranslation {
  lang: string;
  value: string;

  /**
   * Constructs a new SearchTermTranslation instance.
   *
   * @param lang - The language code for the translation.
   * @param value - The translated value.
   */
  constructor(lang: string, value: string) {
    this.lang = lang;
    this.value = value;
  }

  /**
   * Gets the language code for the translation.
   *
   * @returns The language code as a string.
   */
  getLang(): string {
    return this.lang;
  }

  /**
   * Sets the language code for the translation.
   *
   * @param lang - The new language code as a string.
   */
  setLang(lang: string): void {
    this.lang = lang;
  }

  /**
   * Gets the translated value.
   *
   * @returns The translated value as a string.
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Sets the translated value.
   *
   * @param value - The new translated value as a string.
   */
  setValue(value: string): void {
    this.value = value;
  }
}
