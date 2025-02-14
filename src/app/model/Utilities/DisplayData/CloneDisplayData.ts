import { CloneTranslations } from './CloneTranslations';
import { Display } from '../../DataSelection/Profile/DisplayData';

export class CloneDisplayData {
  static deepCopyDisplayData(displayData: Display): Display {
    const original = displayData.getOriginal();
    const translations = CloneTranslations.deepCopyTranslations(displayData.getTranslations());
    return new Display(translations, original);
  }
}
