import { Translation } from './Translation';

export class DisplayData {
  private originals: string[];
  private original: string;
  private translations: Translation[];

  constructor(translations: Translation[], original?: string, originals: string[] = []) {
    this.original = original;
    this.originals = originals;
    this.translations = translations;
  }

  public getOriginal(): string {
    return this.original;
  }

  public getOriginals(): string[] {
    return this.originals;
  }

  public getTranslations(): Translation[] {
    return this.translations;
  }

  public translate(language: string): string {
    const translation = this.translations.find((t) => t.getLanguage().split('-')[0] === language);
    console.log(this.translations);
    if (translation) {
      return translation && translation.getValue().length > 0
        ? translation.getValue()
        : this.original;
    }

    if (translation && translation.getValues()?.length > 0) {
      return translation && translation.getValues()?.length > 0
        ? translation.getValues().join(', ')
        : this.originals.join(', ');
    }
  }
}
