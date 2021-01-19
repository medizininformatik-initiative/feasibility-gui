import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuerybuilderOverviewComponent } from './querybuilder-overview.component'

describe('QuerybuilderOverviewComponent', () => {
  let component: QuerybuilderOverviewComponent
  let fixture: ComponentFixture<QuerybuilderOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderOverviewComponent],
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
