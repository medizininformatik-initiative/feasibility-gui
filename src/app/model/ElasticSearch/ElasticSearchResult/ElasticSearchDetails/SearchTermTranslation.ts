class SearchTermTranslation {
  lang: string;
  value: string;

  constructor(lang: string, value: string) {
    this.lang = lang;
    this.value = value;
  }

  // Getters and setters for lang
  getLang(): string | undefined {
    return this.lang;
  }

  setLang(lang: string): void {
    this.lang = lang;
  }

  // Getters and setters for value
  getValue(): string | undefined {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }
}
