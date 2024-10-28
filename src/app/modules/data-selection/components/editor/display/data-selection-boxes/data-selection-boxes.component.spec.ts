import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectionBoxesComponent } from './data-selection-boxes.component';

describe('DataSelectionBoxesComponent', () => {
  let component: DataSelectionBoxesComponent;
  let fixture: ComponentFixture<DataSelectionBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSelectionBoxesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataSelectionBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
