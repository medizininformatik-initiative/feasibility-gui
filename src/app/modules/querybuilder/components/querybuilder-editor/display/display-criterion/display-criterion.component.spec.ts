import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCriterionComponent } from './display-criterion.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'
import { ComponentType } from '@angular/cdk/overlay'
import { TemplateRef } from '@angular/core'
import { Observable, of } from 'rxjs'
import { FeatureService } from '../../../../../../service/feature.service'
import { OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { OAuthStorage } from 'angular-oauth2-oidc'

describe('DisplayCriterionComponent', () => {
  let component: DisplayCriterionComponent
  let fixture: ComponentFixture<DisplayCriterionComponent>
  let criterion = new Criterion()
  let query = new Query()
  let dialog
  let dialogRef

  const featureService = {
    useFeatureMultipleValueDefinitions(): boolean {
      return true
    },
    useFeatureTimeRestriction(): boolean {
      return true
    },
    getPatientResultLowerBoundary(): number {
      return 0
    },
  } as FeatureService

  const valueFilter2: ValueFilter = {
    precision: 2,
    type: OperatorOptions.CONCEPT,
    selectedConcepts: [],
  }

  const authStorage = {
    getItem: (accessToken: string) => 'test_token',
  } as OAuthStorage

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DisplayCriterionComponent,
        DisplayTimeRestrictionComponent,
        DisplayValueFilterComponent,
      ],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
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
    dialogRef = {
      afterClosed(): Observable<any | undefined> {
        return of(new Query())
      },
    } as MatDialogRef<any>

    // noinspection JSUnusedLocalSymbols
    dialog = {
      open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>
      ): MatDialogRef<T, R> {
        return dialogRef
      },
    } as MatDialog

    fixture = TestBed.createComponent(DisplayCriterionComponent)
    component = fixture.componentInstance
    component.dialog = dialog

    query = QueryProviderService.createTestQuery()
    criterion = query.groups[0].inclusionCriteria[0][0]
    component.criterion = criterion
    component.query = query

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open dialog and store query', () => {
    jest.spyOn(component.dialog, 'open').mockReturnValue(dialogRef)
    spyOn(component.storeQuery, 'emit')
    component.isEditable = true
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterion,
      query,
    }

    component.openDetailsPopUp()
    expect(component.dialog.open).toHaveBeenCalledWith(EditSingleCriterionComponent, dialogConfig)
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should fire delete event', () => {
    spyOn(component.delete, 'emit')
    component.doDelete()
    expect(component.delete.emit).toHaveBeenCalledWith(criterion)
  })

  it('should use all available filters', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(true)
    component.featureService = featureService

    component.criterion.valueFilters.push(valueFilter2)

    expect(component.getValueFilters().length).toBe(2)
  })

  it('should use only the first value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    component.criterion.valueFilters.push(valueFilter2)

    expect(component.getValueFilters().length).toBe(1)
  })

  it('should use one value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    expect(component.getValueFilters().length).toBe(1)
  })

  it('should use no value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    component.criterion.valueFilters = []

    expect(component.getValueFilters().length).toBe(0)
  })
})
