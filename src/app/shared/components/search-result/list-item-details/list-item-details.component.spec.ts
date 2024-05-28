import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDetails } from './list-item-details.component';

describe('ListItemDetails', () => {
  let component: ListItemDetails;
  let fixture: ComponentFixture<ListItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
