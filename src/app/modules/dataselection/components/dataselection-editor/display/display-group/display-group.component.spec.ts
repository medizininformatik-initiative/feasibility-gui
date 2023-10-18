import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGroupComponent } from './display-group.component';

describe('DisplayGroupComponent', () => {
  let component: DisplayGroupComponent;
  let fixture: ComponentFixture<DisplayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
