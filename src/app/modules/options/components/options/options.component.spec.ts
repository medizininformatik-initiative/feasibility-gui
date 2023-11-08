import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsComponent, SafePipe } from './options.component';
import { MaterialModule } from '../../../../layout/material/material.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureService } from '../../../../service/feature.service';
import { IAppConfig } from '../../../../config/app-config.model';
import { FeatureProviderService } from '../../../querybuilder/service/feature-provider.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  const featureProviderService = {
    getFeatures: (): IAppConfig => ({
      env: null,
      api: null,
      uiBackendApi: null,
      features: null,
      stylesheet: 'abide',
      auth: null,
      dataset: null,
      queryVersion: 'v2',
      options: {
        sendsqcontexttobackend: true,
        pollingintervallinseconds: 0,
        pollingtimeinseconds: 0,
        lowerboundarypatientresult: 0,
        lowerboundarylocationresult: 0,
      },
      fhirport: null,
      legal: null,
      mock: null,
      proposalPortalLink: null,
    }),
  } as FeatureProviderService;

  const featureService = {
    useFeatureMultipleValueDefinitions: (): boolean => true,
    useFeatureTimeRestriction: (): boolean => true,
    useFeatureShowDisplayValueFilterIcon: (): boolean => true,
    getPatientResultLowerBoundary: (): number => 0,
    useFeatureMultipleGroups: (): boolean => false,
    useFeatureOptionsPage: (): boolean => true,
    useFeatureDependentGroups: (): boolean => false,
  } as FeatureService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsComponent, SafePipe],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
