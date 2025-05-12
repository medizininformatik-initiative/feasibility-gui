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

    // CASE 1: If `originals` exists, we assume it's a list of values
    if (this.originals && this.originals.length > 0) {
      const base = this.originals;

      if (translation && translation.getValues()?.length > 0) {
        const merged = base.map((orig, index) => {
          const translated = translation.getValues()[index];
          return translated !== null && translated !== undefined ? translated : orig;
        });
        return merged.join(', ');
      }

      return base.join(', ');
    }

    // CASE 2: Single `original` string
    if (this.original) {
      if (translation && translation.getValue()) {
        return translation.getValue() ?? this.original;
      }
      return this.original;
    }

    return '';
  }
}
