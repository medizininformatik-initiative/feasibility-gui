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
import { QueryProviderService } from '../../../../service/query-provider.service'

describe('EditSingleCriterionComponent', () => {
  let component: EditSingleCriterionComponent
  let fixture: ComponentFixture<EditSingleCriterionComponent>
  let matDialogRef
  let providerService

  beforeEach(async () => {
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<EditSingleCriterionComponent>

    // noinspection JSUnusedLocalSymbols
    providerService = {
      store(query: Query): void {},
    } as QueryProviderService

    await TestBed.configureTestingModule({
      declarations: [
        EditSingleCriterionComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        ButtonComponent,
        MatInputNumberDirective,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        MaterialModule,
        TranslateModule.forRoot(),
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
        { provide: QueryProviderService, useValue: providerService },
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
    spyOn(providerService, 'store')

    component.provider = providerService
    component.dialogRef = matDialogRef

    const querySnapshot = new Query()
    querySnapshot.display = 'SNAPSHOT'
    const queryModified = new Query()
    queryModified.display = 'MODIFIED'

    component.querySnapshot = querySnapshot
    component.queryModified = queryModified

    component.doCancel()

    expect(providerService.store).toBeCalled()
    expect(providerService.store).toBeCalledWith(querySnapshot)
    expect(matDialogRef.close).toBeCalledWith(querySnapshot)
  })

  it('should store modified query', () => {
    spyOn(matDialogRef, 'close')
    spyOn(providerService, 'store')

    component.provider = providerService
    component.dialogRef = matDialogRef

    const querySnapshot = new Query()
    querySnapshot.display = 'SNAPSHOT'
    const queryModified = new Query()
    queryModified.display = 'MODIFIED'

    component.querySnapshot = querySnapshot
    component.queryModified = queryModified

    component.doSave()

    expect(providerService.store).toBeCalledWith(queryModified)
    expect(matDialogRef.close).toBeCalledWith(queryModified)
  })
})
