import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { QuerybuilderComponent } from './querybuilder.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { IUser } from 'src/app/shared/models/user/user.interface'

describe('AdminComponent', () => {
  let component: QuerybuilderComponent
  let fixture: ComponentFixture<QuerybuilderComponent>

  const unapprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    unapprovedUsersObservable$: unapprovedUsersSubject$.asObservable(),
    getUnapprovedUsers: () => of(),
  } as AdminService

  @Component({ selector: 'num-unapproved-users-table', template: '' })
  class UserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderComponent, UserTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerybuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(adminService, 'getUnapprovedUsers')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getUnapprovedUsers', () => {
    expect(adminService.getUnapprovedUsers).toHaveBeenCalled()
  })
})
