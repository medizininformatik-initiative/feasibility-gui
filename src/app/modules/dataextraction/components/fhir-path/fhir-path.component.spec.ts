import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirPathComponent } from './fhir-path.component';

describe('FhirPathComponent', () => {
  let component: FhirPathComponent;
  let fixture: ComponentFixture<FhirPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirPathComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhirPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
