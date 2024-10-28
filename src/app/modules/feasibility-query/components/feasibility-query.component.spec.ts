import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityQueryComponent } from './feasibility-query.component';

describe('FeasibilityQueryComponent', () => {
  let component: FeasibilityQueryComponent;
  let fixture: ComponentFixture<FeasibilityQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeasibilityQueryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeasibilityQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
