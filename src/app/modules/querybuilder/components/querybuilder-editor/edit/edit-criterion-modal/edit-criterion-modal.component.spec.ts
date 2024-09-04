import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriterionModalComponent } from './edit-criterion-modal.component';

describe('EditCriterionWindowComponent', () => {
  let component: EditCriterionModalComponent;
  let fixture: ComponentFixture<EditCriterionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCriterionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCriterionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
