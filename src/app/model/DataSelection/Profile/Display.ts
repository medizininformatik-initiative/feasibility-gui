import { DisplayData } from '../../Interface/DisplayData';
import { Translation } from './Translation';

export class Display {
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

  public setOriginal(orginal: string): string {
    return (this.original = orginal);
  }

  public getOriginals(): string[] {
    return this.originals;
  }

  public getTranslations(): Translation[] {
    return this.translations;
  }

  public translate(language: string): string {
    const translation = this.translations.find((t) => t.getLanguage().split('-')[0] === language);

    if (translation && translation.getValue()) {
      return translation.getValue().length > 0 ? translation.getValue() : this.original;
    }

    if (translation && translation.getValues()?.length > 0) {
      return translation.getValues().join(', ');
    }

    return this.original?.length > 0 ? this.original : this.originals.join(', ');
  }
}
