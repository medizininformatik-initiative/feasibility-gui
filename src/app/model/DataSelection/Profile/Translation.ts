export class Translation {
  private language: string;
  private value: string;

  constructor(language: string, value: string) {
    this.language = language;
    this.value = value;
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLangugae(language: string): void {
    this.language = language;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }
}
