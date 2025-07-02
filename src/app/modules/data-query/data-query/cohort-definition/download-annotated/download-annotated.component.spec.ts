import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAnnotatedComponent } from './download-annotated.component';

describe('DownloadAnnotatedComponent', () => {
  let component: DownloadAnnotatedComponent;
  let fixture: ComponentFixture<DownloadAnnotatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadAnnotatedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadAnnotatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
