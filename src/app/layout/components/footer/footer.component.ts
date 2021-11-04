import { AfterViewInit, Component, OnInit } from '@angular/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'
import { FeatureProviderService } from '../../../modules/querybuilder/service/feature-provider.service'

@Component({
  selector: 'num-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  config: IAppConfig
  stylesheet: string
  urlSrc: string
  urlAlt: string

  constructor(
    private appConfig: AppConfigService,
    private featureProviderService: FeatureProviderService
  ) {
    this.config = appConfig.config
    this.stylesheet = featureProviderService.getFeatures().stylesheet
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.featureProviderService.setTheme(this.stylesheet, this.stylesheet)
  }
}
