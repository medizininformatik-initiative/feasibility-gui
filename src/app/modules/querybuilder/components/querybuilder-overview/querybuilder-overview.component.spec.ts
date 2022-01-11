import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuerybuilderOverviewComponent } from './querybuilder-overview.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SingleQueryComponent } from './single-query/single-query.component'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

describe('QuerybuilderOverviewComponent', () => {
  let component: QuerybuilderOverviewComponent
  let fixture: ComponentFixture<QuerybuilderOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderOverviewComponent, ButtonComponent, SingleQueryComponent],
      imports: [
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerybuilderOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
