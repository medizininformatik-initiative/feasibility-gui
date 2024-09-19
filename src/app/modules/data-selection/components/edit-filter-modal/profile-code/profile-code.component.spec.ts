import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCodeComponent } from './profile-code.component';

describe('ProfileCodeComponent', () => {
  let component: ProfileCodeComponent;
  let fixture: ComponentFixture<ProfileCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
