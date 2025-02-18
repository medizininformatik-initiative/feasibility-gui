import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCohortComponent } from './download-cohort.component';

describe('DownloadCohortComponent', () => {
  let component: DownloadCohortComponent;
  let fixture: ComponentFixture<DownloadCohortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadCohortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
