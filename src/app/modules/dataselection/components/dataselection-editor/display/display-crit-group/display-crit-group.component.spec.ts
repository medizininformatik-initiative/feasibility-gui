import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCritGroupComponent } from './display-crit-group.component';

describe('DisplayCritGroupComponent', () => {
  let component: DisplayCritGroupComponent;
  let fixture: ComponentFixture<DisplayCritGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCritGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCritGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
