import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsComponent, SafePipe } from './options.component';
import { MaterialModule } from '../../../../layout/material/material.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureService } from '../../../../service/feature.service';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsComponent, SafePipe],
      imports: [MaterialModule, TranslateModule.forRoot(), FormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: FeatureService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;

    // TODO: stylesheet must be declared

    //  fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
