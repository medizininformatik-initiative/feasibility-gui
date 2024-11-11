export class Translation {
  private language: string;
  private values: string[];

  constructor(language: string, values: string[]) {
    this.language = language;
    this.values = values;
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLangugae(language: string): void {
    this.language = language;
  }

  public getValues(): string[] {
    return this.values;
  }

  public setValues(values: string[]): void {
    this.values = values;
  }
}
