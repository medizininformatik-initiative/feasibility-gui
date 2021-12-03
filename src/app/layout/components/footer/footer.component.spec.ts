import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'
import { MaterialModule } from '../../material/material.module'

import { FooterComponent } from './footer.component'
import { LanguageComponent } from '../language/language.component'
import { FeatureProviderService } from '../../../modules/querybuilder/service/feature-provider.service'
import { FeatureService } from '../../../service/feature.service'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>
  let appConfig: AppConfigService

  beforeEach(async () => {
    const featureService = {
      getStylesheet(): string {
        return 'abideTheme'
      },
    } as FeatureService

    const featureProviderService = {
      getFeatures(): IAppConfig {
        return {
          env: null,
          api: null,
          uiBackendApi: null,
          features: null,
          stylesheet: 'abide',
          auth: null,
          dataset: null,
          queryVersion: null,
          options: null,
          fhirport: null,
          legal: null,
          mock: null,
        }
      },
      setTheme(oldTheme: string, newTheme: string): void {},
    } as FeatureProviderService

    await TestBed.configureTestingModule({
      declarations: [FooterComponent, LanguageComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: FeatureProviderService,
          useValue: featureProviderService,
        },
        {
          provide: FeatureService,
          useValue: featureService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    appConfig = TestBed.inject(AppConfigService)
    appConfig.config = ({} as unknown) as IAppConfig
    appConfig.config.legal = {
      copyrightOwner: 'Test',
      version: '1.0.0',
    }
    fixture = TestBed.createComponent(FooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('Footer Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })
})
