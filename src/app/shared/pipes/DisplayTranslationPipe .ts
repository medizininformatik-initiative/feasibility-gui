import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

@Pipe({
  name: 'displayTranslation',
  standalone: true,
  pure: false,
})
export class DisplayTranslationPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(display: DisplayData): string {
    const currentLang = this.translateService.currentLang;
    return display.getTranslation(currentLang);
  }
}
