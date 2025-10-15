import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FeatureProviderService } from 'src/app/service/FeatureProvider.service';
import { AppConfigData } from 'src/app/config/model/AppConfig/AppConfigData';
import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';

@Component({
  selector: 'num-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  config: AppConfigData;
  stylesheet: string;
  urlSrc: string;
  urlAlt: string;

  constructor(
    private appSettingsProviderService: AppSettingsProviderService,
    private featureProviderService: FeatureProviderService
  ) {}

  ngOnInit(): void {
    this.stylesheet = this.appSettingsProviderService.getStylesheet();
  }

  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet);
  }
}
