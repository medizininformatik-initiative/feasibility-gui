import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortDefinitionActionBarComponent } from './cohort-definition-action-bar.component';

describe('CohortDefinitionActionBarComponent', () => {
  let component: CohortDefinitionActionBarComponent;
  let fixture: ComponentFixture<CohortDefinitionActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortDefinitionActionBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CohortDefinitionActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
