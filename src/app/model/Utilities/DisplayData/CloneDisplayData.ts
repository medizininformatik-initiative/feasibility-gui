import { DisplayData } from '../../DataSelection/Profile/DisplayData';
import { Translation } from '../../DataSelection/Profile/Translation';
import { CloneTranslations } from './CloneTranslations';

export class CloneDisplayData {
  static deepCopyDisplayData(displayData: DisplayData): DisplayData {
    const original = displayData.getOriginal();
    const translations = CloneTranslations.deepCopyTranslations(displayData.getTranslations());
    return new DisplayData(translations, original);
  }
}
