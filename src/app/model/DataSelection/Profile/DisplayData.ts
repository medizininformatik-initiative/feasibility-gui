import { Translation } from './Translation';

export class DisplayData {
  private original: string[];
  private translations: Translation[];
  constructor(original: string[], translations: Translation[]) {
    this.original = original;
    this.translations = translations;
  }

  public getOriginal(): string[] {
    return this.original;
  }

  public getTranslations(): Translation[] {
    return this.translations;
  }

  public translate(language: string): string {
    const translation = this.translations.find((t) => t.getLanguage().split('-')[0] === language);
    return translation && translation.getValues().length > 0
      ? translation.getValues().join(', ')
      : this.original.join(', ');
  }
}
