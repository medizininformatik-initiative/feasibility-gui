import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  EditGroupConnectionComponent,
  EditGroupConnectionComponentData,
} from './edit-group-connection.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Group, InstanceRestrictionType } from '../../../../model/api/query/group'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatTooltipModule } from '@angular/material/tooltip'

describe('EditGroupConnectionComponent', () => {
  let component: EditGroupConnectionComponent
  let fixture: ComponentFixture<EditGroupConnectionComponent>

  let data: EditGroupConnectionComponentData
  let testBedConfig
  let matDialogRef

  beforeEach(() => {
    data = {
      query: QueryProviderService.createTestQuery(),
      parentGroup: QueryProviderService.createTestQuery().groups[0],
      dependentGroup: QueryProviderService.createTestQuery().groups[0],
      connection: {
        linked: true,
        restrictionType: InstanceRestrictionType.EVERY,
        dependentGroupRestrictionType: InstanceRestrictionType.FIRST,
      },
    }

    matDialogRef = {
      close: () => {},
    } as MatDialogRef<EditGroupConnectionComponent>

    testBedConfig = {
      declarations: [EditGroupConnectionComponent, MatInputNumberDirective, ButtonComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    }
  })

  it('should create and initialize snapshot and original query with equivalent but not identical values', () => {
    TestBed.configureTestingModule(testBedConfig).compileComponents()
    fixture = TestBed.createComponent(EditGroupConnectionComponent)

    component = fixture.componentInstance
    fixture.detectChanges()

    expect(component).toBeTruthy()
    expect(component.queryModified).not.toBe(component.querySnapshot)
    expect(component.queryModified).toEqual(component.querySnapshot)
  })

  it('should close with modified query', () => {
    jest.spyOn(matDialogRef, 'close')

    TestBed.configureTestingModule(testBedConfig).compileComponents()
    fixture = TestBed.createComponent(EditGroupConnectionComponent)

    component = fixture.componentInstance
    fixture.detectChanges()

    // Modify query
    component.queryModified.groups.push(new Group())
    component.doSave()

    expect(matDialogRef.close).toBeCalledWith(component.queryModified)
    expect(matDialogRef.close).not.toBeCalledWith(component.querySnapshot)
  })

  it('should close with original snapshot query', () => {
    jest.spyOn(matDialogRef, 'close')

    TestBed.configureTestingModule(testBedConfig).compileComponents()
    fixture = TestBed.createComponent(EditGroupConnectionComponent)

    component = fixture.componentInstance
    fixture.detectChanges()

    // Modify query
    component.queryModified.groups.push(new Group())
    component.doDiscard()

    expect(matDialogRef.close).not.toBeCalledWith(component.queryModified)
    expect(matDialogRef.close).toBeCalledWith(component.querySnapshot)
  })
})
