import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { QuerybuilderEditorComponent } from './querybuilder-editor.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'

describe('AdminComponent', () => {
  let component: QuerybuilderEditorComponent
  let fixture: ComponentFixture<QuerybuilderEditorComponent>

  @Component({ selector: 'num-unapproved-users-table', template: '' })
  class UserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderEditorComponent, UserTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerybuilderEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
