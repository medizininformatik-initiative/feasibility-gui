import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLinkedCriterionComponent } from './display-linked-criterion.component';

describe('DisplayLinkedCriterionComponent', () => {
  let component: DisplayLinkedCriterionComponent;
  let fixture: ComponentFixture<DisplayLinkedCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayLinkedCriterionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLinkedCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
