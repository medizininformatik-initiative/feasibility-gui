import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarContentComponent } from './snack-bar-content.component';

describe('SnackBarContentComponent', () => {
  let component: SnackBarContentComponent;
  let fixture: ComponentFixture<SnackBarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackBarContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackBarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
