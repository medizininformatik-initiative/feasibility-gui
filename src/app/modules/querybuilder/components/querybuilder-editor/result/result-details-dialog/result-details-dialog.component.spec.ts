import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  ResultDetailsDialogComponent,
  ResultDetailsDialogComponentData,
} from './result-details-dialog.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { of } from 'rxjs'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'

describe('ResultDetailsDialogComponent', () => {
  let component: ResultDetailsDialogComponent
  let fixture: ComponentFixture<ResultDetailsDialogComponent>
  let data: ResultDetailsDialogComponentData
  let matDialogRef

  beforeEach(async () => {
    data = {
      resultObservable$: of({ totalNumberOfPatients: 0, queryId: '13', resultLines: [] }),
    }
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<ResultDetailsDialogComponent>

    const featureService = {
      getPatientResultLowerBoundary(): number {
        return 10
      },
      getLocationResultLowerBoundary(): number {
        return 3
      },
    } as FeatureService

    await TestBed.configureTestingModule({
      declarations: [ResultDetailsDialogComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: FeatureService, useValue: featureService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should close dialog', () => {
    jest.spyOn(component.dialogRef, 'close')
    component.doClose()
    expect(component.dialogRef.close).toBeCalled()
  })
})
