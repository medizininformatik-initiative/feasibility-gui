import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuerybuilderOverviewComponent } from './querybuilder-overview.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SingleQueryComponent } from './single-query/single-query.component'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { FeatureService } from '../../../../service/feature.service'
import { BackendService } from '../../service/backend.service'

describe('QuerybuilderOverviewComponent', () => {
  let component: QuerybuilderOverviewComponent
  let fixture: ComponentFixture<QuerybuilderOverviewComponent>

  const featureService = {
    mockLoadnSave(): boolean {
      return true
    },
    getPatientResultLowerBoundary(): number {
      return 0
    },
  } as FeatureService

  const authStorage = {
    getItem: (accessToken: string) => 'test_token',
  } as OAuthStorage

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderOverviewComponent, ButtonComponent, SingleQueryComponent],
      imports: [
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        { provide: FeatureService, useValue: featureService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerybuilderOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
