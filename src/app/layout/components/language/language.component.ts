import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'num-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  languages: string[] = ['de', 'en'];

  constructor(public translate: TranslateService) {
    translate.addLangs(this.languages);
    translate.setDefaultLang('de');

    const browserLang = translate.getBrowserLang();
    translate.use(this.languages.includes(browserLang) ? browserLang : 'de');
  }

  ngOnInit(): void {}

  public changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
