import { Translation } from './Translation';

export class DisplayData {
  constructor(public original: string, public translations: Translation[]) {}

  public getTranslation(language: string): string {
    for (const translation of this.translations) {
      const translationLang = translation.language.split('-')[0];

      if (translationLang === language) {
        return translation.value;
      }
    }
  }
}
