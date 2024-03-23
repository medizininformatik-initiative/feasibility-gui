import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataextractionEditorComponent } from './dataextraction-editor.component';

describe('DataextractionEditorComponent', () => {
  let component: DataextractionEditorComponent;
  let fixture: ComponentFixture<DataextractionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataextractionEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataextractionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
