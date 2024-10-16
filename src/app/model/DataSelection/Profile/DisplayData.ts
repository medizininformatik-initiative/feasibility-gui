import { Translation } from './Translation';

export class DisplayData {
  constructor(public original: string, public translations: Translation[]) {}

  public getTranslation(language: string): string {
    const translation = this.translations.find((t) => t.language.split('-')[0] === language);
    return translation && translation.value ? translation.value : this.original;
  }
}
