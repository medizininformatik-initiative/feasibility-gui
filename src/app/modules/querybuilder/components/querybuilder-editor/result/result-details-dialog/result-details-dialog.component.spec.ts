import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ResultDetailsDialogComponent,
  ResultDetailsDialogComponentData,
} from './result-details-dialog.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../../layout/material/material.module';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureService } from '../../../../../../service/Feature.service';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ResultDetailsDialogComponent', () => {
  let component: ResultDetailsDialogComponent;
  let fixture: ComponentFixture<ResultDetailsDialogComponent>;
  let data: ResultDetailsDialogComponentData;
  let matDialogRef;

  beforeEach(async () => {
    data = {
      resultObservable$: of({ totalNumberOfPatients: 0, queryId: '13', resultLines: [] }),
      myResult: { totalNumberOfPatients: 0, queryId: '13', resultLines: [] },
      isResultLoaded: false,
    };
    matDialogRef = {
      close: () => {},
    } as MatDialogRef<ResultDetailsDialogComponent>;

    const featureService = {
      getPatientResultLowerBoundary: (): number => 10,
      getLocationResultLowerBoundary: (): number => 3,
    } as FeatureService;

    const authStorage = {
      getItem: (accessToken: string) => 'test_token',
    } as OAuthStorage;

    await TestBed.configureTestingModule({
      declarations: [ResultDetailsDialogComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: FeatureService, useValue: featureService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', () => {
    jest.spyOn(component.dialogRef, 'close');
    component.doClose();
    expect(component.dialogRef.close).toBeCalled();
  });
});
