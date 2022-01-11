import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SaveDialogComponent } from './save-dialog.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('SaveDialogComponent', () => {
  let component: SaveDialogComponent
  let fixture: ComponentFixture<SaveDialogComponent>
  let matDialogRef

  beforeEach(async () => {
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<SaveDialogComponent>

    await TestBed.configureTestingModule({
      declarations: [SaveDialogComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: matDialogRef }],
    }).compileComponents()
  })

  beforeEach(() => {
    // Workaround: see https://github.com/thymikee/jest-preset-angular/issues/122
    // noinspection JSUnusedLocalSymbols
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })
    fixture = TestBed.createComponent(SaveDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
