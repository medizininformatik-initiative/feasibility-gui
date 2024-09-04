import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCriteriaGroupComponent } from './display-criteria-group.component';

describe('DisplayCriteriaGroupComponent', () => {
  let component: DisplayCriteriaGroupComponent;
  let fixture: ComponentFixture<DisplayCriteriaGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCriteriaGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCriteriaGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
