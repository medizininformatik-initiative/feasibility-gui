import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPathExpressionsComponent } from './fhir-path-expressions.component';

describe('FhirPathExpressionsComponent', () => {
  let component: FhirPathExpressionsComponent;
  let fixture: ComponentFixture<FhirPathExpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirPathExpressionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhirPathExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
