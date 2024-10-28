import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IAppConfig } from 'src/app/config/app-config.model';
import { AppConfigService } from 'src/app/config/app-config.service';
import { FeatureService } from '../../../service/Feature.service';
import { FeatureProviderService } from 'src/app/modules/feasibility-query/service/feature-provider.service';

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
