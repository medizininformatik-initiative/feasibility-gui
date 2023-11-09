import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingOverviewComponent } from './rating-overview.component';

describe('RatingOverviewComponent', () => {
  let component: RatingOverviewComponent;
  let fixture: ComponentFixture<RatingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
