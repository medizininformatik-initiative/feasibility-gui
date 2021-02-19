import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EnterCriterionListComponent } from './enter-criterion-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'

describe('EnterCriterionListComponent', () => {
  let component: EnterCriterionListComponent
  let fixture: ComponentFixture<EnterCriterionListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnterCriterionListComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: [new TerminologyEntry()] }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
