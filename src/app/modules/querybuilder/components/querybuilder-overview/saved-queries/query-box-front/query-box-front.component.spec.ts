import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBoxFrontComponent } from './query-box-front.component';

describe('QueryBoxFrontComponent', () => {
  let component: QueryBoxFrontComponent;
  let fixture: ComponentFixture<QueryBoxFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueryBoxFrontComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QueryBoxFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
