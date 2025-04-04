import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { DisplayData } from 'src/app/model/Interface/DisplayData';
import { Injectable } from '@angular/core';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

@Injectable({
  providedIn: 'root',
})
export class DisplayDataFactoryService {
  constructor() {}

  public createDisplayData(displayData: any): Display {
    const translations = displayData.translations?.map((translation) =>
      this.createTranslation(translation)
    );
    return new Display(translations, displayData.original);
  }

  private createTranslation(translation: any): Translation {
    return new Translation(translation.language, translation.value);
  }
}
