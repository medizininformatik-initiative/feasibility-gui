import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTimeRestrictionComponent } from './profile-time-restriction.component';

describe('ProfileTimeRestrictionComponent', () => {
  let component: ProfileTimeRestrictionComponent;
  let fixture: ComponentFixture<ProfileTimeRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileTimeRestrictionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTimeRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
