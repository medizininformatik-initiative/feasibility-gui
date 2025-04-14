import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReferenceComponent } from './profile-reference.component';

describe('ProfileReferenceComponent', () => {
  let component: ProfileReferenceComponent;
  let fixture: ComponentFixture<ProfileReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileReferenceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
