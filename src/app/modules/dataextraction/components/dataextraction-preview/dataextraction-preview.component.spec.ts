import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataextractionPreviewComponent } from './dataextraction-preview.component';

describe('DataextractionPreviewComponent', () => {
  let component: DataextractionPreviewComponent;
  let fixture: ComponentFixture<DataextractionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataextractionPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataextractionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
