import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditGroupConnectionComponent } from './edit-group-connection.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { InstanceRestrictionType } from '../../../../model/api/query/group'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('EditGroupConnectionComponent', () => {
  let component: EditGroupConnectionComponent
  let fixture: ComponentFixture<EditGroupConnectionComponent>

  const dialogConfig = new MatDialogConfig()
  const matDialogRef = {
    close: () => {},
  } as MatDialogRef<EditGroupConnectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupConnectionComponent, MatInputNumberDirective, ButtonComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogConfig },
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupConnectionComponent)
    component = fixture.componentInstance
    component.connection = {
      linked: false,
      restrictionType: InstanceRestrictionType.EVERY,
      dependentGroupRestrictionType: InstanceRestrictionType.FIRST,
    }

    component.parentGroup = QueryProviderService.createTestQuery().groups[0]
    component.dependentGroup = QueryProviderService.createTestQuery().groups[0]

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
