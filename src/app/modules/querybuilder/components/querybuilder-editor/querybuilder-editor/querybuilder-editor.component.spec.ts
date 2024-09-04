import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerybuilderEditorComponent } from './querybuilder-editor.component';

describe('QuerybuilderEditorComponent', () => {
  let component: QuerybuilderEditorComponent;
  let fixture: ComponentFixture<QuerybuilderEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuerybuilderEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuerybuilderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
