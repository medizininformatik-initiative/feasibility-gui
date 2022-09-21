import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ImportDialogComponent } from './import-dialog.component'
import { FeatureService } from '../../../../../../service/feature.service'
import { OAuthService } from 'angular-oauth2-oidc'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogRef } from '@angular/material/dialog'
import { IAppConfig } from '../../../../../../config/app-config.model'
import { FeatureProviderService } from '../../../../service/feature-provider.service'

describe('ImportDialogComponent', () => {
  let component: ImportDialogComponent
  let fixture: ComponentFixture<ImportDialogComponent>
  let matDialogRef

  const authService = {
    hasValidAccessToken: () => true,
  } as OAuthService

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
        queryVersion: 'v2',
        options: null,
        fhirport: null,
        legal: null,
        mock: null,
      }
    },
  } as FeatureProviderService

  beforeEach(async () => {
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<ImportDialogComponent>

    await TestBed.configureTestingModule({
      declarations: [ImportDialogComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: OAuthService, useValue: authService },
        { provide: MatDialogRef, useValue: matDialogRef },
        {
          provide: FeatureProviderService,
          useValue: featureProviderService,
        },
        { provide: FeatureService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDialogComponent)
    component = fixture.componentInstance
    // fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
