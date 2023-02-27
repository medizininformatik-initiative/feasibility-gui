import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IAppConfig } from 'src/app/config/app-config.model';
import { AppConfigService } from 'src/app/config/app-config.service';
import { FeatureProviderService } from '../../../modules/querybuilder/service/feature-provider.service';
import { FeatureService } from '../../../service/feature.service';

@Component({
  selector: 'num-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  config: IAppConfig;
  stylesheet: string;
  urlSrc: string;
  urlAlt: string;

  constructor(
    private appConfig: AppConfigService,
    private featureProviderService: FeatureProviderService,
    public featureService: FeatureService
  ) {
    this.config = appConfig.config;
  }

  ngOnInit(): void {
    this.stylesheet = this.featureService.getStylesheet();
  }

  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet);
  }
}
