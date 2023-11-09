import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBoxEndComponent } from './query-box-end.component';

describe('QueryBoxEndComponent', () => {
  let component: QueryBoxEndComponent;
  let fixture: ComponentFixture<QueryBoxEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueryBoxEndComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryBoxEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
