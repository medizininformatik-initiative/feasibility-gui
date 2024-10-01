import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortDefinitionComponent } from './cohort-definition.component';

describe('CohortDefinitionComponent', () => {
  let component: CohortDefinitionComponent;
  let fixture: ComponentFixture<CohortDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortDefinitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CohortDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
