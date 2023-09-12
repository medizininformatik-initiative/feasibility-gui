import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataselectionEditorComponent } from './dataselection-editor.component';

describe('DataselectionEditorComponent', () => {
  let component: DataselectionEditorComponent;
  let fixture: ComponentFixture<DataselectionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataselectionEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataselectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
