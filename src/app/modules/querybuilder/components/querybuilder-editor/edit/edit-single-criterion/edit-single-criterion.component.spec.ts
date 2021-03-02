import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditSingleCriterionComponent } from './edit-single-criterion.component'
import { EditCriterionComponent } from '../edit-criterion/edit-criterion.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'
import { OperatorOptions } from '../../../../model/api/query/valueFilter'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'
import { EditTimeRestrictionComponent } from '../edit-time-restriction/edit-time-restriction.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('EditSingleCriterionComponent', () => {
  let component: EditSingleCriterionComponent
  let fixture: ComponentFixture<EditSingleCriterionComponent>
  let matDialogRef

  const querySnapshot = new Query()
  querySnapshot.display = 'SNAPSHOT'
  const queryModified = new Query()
  queryModified.display = 'MODIFIED'

  beforeEach(async () => {
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<EditSingleCriterionComponent>

    const featureService = {
      useFeatureMultipleValueDefinitions(): boolean {
        return true
      },
      useFeatureTimeRestriction(): boolean {
        return true
      },
      useFeatureMultipleGroups(): boolean {
        return true
      },
      useFeatureDependentGroups(): boolean {
        return true
      },
    } as FeatureService

    await TestBed.configureTestingModule({
      declarations: [
        EditSingleCriterionComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        ButtonComponent,
        MatInputNumberDirective,
        EditTimeRestrictionComponent,
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        MaterialModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            query: new Query(),
            criterion: new Criterion(),
          },
        },
        { provide: MatDialogRef, useValue: matDialogRef },
        {
          provide: FeatureService,
          useValue: featureService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleCriterionComponent)
    component = fixture.componentInstance

    const valueDefinition = {
      type: ValueType.CONCEPT,
      precision: 1,
    }

    const criterion = new Criterion()
    criterion.valueFilters = [
      {
        precision: 1,
        type: OperatorOptions.CONCEPT,
        selectedConcepts: [],
        valueDefinition,
      },
    ]
    criterion.termCode = {
      code: 'a',
      system: 'http://test',
      display: 'none',
    }
    component.criterion = criterion

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should store original query', () => {
    spyOn(matDialogRef, 'close')

    component.dialogRef = matDialogRef

    component.querySnapshot = querySnapshot
    component.queryModified = queryModified

    component.doCancel()

    expect(matDialogRef.close).toBeCalledWith(querySnapshot)
  })

  it('should store modified query', () => {
    spyOn(matDialogRef, 'close')

    component.dialogRef = matDialogRef

    component.querySnapshot = querySnapshot
    component.queryModified = queryModified

    component.doSave()

    expect(matDialogRef.close).toBeCalledWith(queryModified)
  })
})
