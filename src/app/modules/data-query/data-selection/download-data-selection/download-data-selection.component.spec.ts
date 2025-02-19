import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDataSelectionComponent } from './download-data-selection.component';

describe('DownloadDataSelectionComponent', () => {
  let component: DownloadDataSelectionComponent;
  let fixture: ComponentFixture<DownloadDataSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadDataSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
