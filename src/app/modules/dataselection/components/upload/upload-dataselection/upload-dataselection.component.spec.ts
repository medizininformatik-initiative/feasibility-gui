import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDataselectionComponent } from './upload-dataselection.component';

describe('UploadDataselectionComponent', () => {
  let component: UploadDataselectionComponent;
  let fixture: ComponentFixture<UploadDataselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDataselectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDataselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
