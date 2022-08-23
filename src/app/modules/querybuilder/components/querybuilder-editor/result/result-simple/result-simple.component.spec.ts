import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultSimpleComponent } from './result-simple.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ResultDetailsDialogComponent } from '../result-details-dialog/result-details-dialog.component'
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import any = jasmine.any
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'
import { OAuthStorage } from 'angular-oauth2-oidc'

describe('ResultSimpleComponent', () => {
  let component: ResultSimpleComponent
  let fixture: ComponentFixture<ResultSimpleComponent>

  const featureService = {
    getPatientResultLowerBoundary(): number {
      return 10
    },
    getLocationResultLowerBoundary(): number {
      return 3
    },
  } as FeatureService

  const authStorage = {
    getItem: (accessToken: string) => 'test_token',
  } as OAuthStorage

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultSimpleComponent, ResultDetailsDialogComponent, ButtonComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        { provide: FeatureService, useValue: featureService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSimpleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open dialog', () => {
    const dialogRef = {} as MatDialogRef<ResultDetailsDialogComponent>
    jest.spyOn(component.dialog, 'open').mockReturnValue(dialogRef)

    component.openDialogResultDetails()
    expect(component.dialog.open).toBeCalledWith(ResultDetailsDialogComponent, any(MatDialogConfig))
  })
})
