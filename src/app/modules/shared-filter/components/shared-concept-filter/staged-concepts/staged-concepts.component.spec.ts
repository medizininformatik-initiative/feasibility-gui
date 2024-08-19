import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedConceptsComponent } from './staged-concepts.component';

describe('StagedConceptsComponent', () => {
  let component: StagedConceptsComponent;
  let fixture: ComponentFixture<StagedConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StagedConceptsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StagedConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
