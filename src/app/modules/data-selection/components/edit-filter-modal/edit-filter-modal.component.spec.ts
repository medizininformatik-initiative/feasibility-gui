import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilterModalComponent } from './edit-filter-modal.component';

describe('EditFilterModalComponent', () => {
  let component: EditFilterModalComponent;
  let fixture: ComponentFixture<EditFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFilterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
