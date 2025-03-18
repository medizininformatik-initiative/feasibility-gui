// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SaveDialogComponent, SaveDialogComponentData } from './save-dialog.component';
// import { MaterialModule } from '../../../../../layout/material/material.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
// import { TranslateModule } from '@ngx-translate/core';
// import { ButtonComponent } from '../../../../../shared/components/button/button.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FeatureService } from '../../../../../service/Feature.service';
// import { OAuthStorage } from 'angular-oauth2-oidc';
// import { MatTooltipModule } from '@angular/material/tooltip';

// describe('SaveDialogComponent', () => {
//   let component: SaveDialogComponent;
//   let fixture: ComponentFixture<SaveDialogComponent>;
//   let matDialogRef;
//   let data: SaveDialogComponentData;

//   const featureService = {
//     mockLoadnSave: (): boolean => true,
//     getPatientResultLowerBoundary: (): number => 0,
//   } as FeatureService;

//   const authStorage = {
//     getItem: (accessToken: string) => 'test_token',
//   } as OAuthStorage;

//   beforeEach(async () => {
//     data = {
//       hasQuerySend: false,
//     };
//     matDialogRef = {
//       close: () => {},
//     } as MatDialogRef<SaveDialogComponent>;

//     await TestBed.configureTestingModule({
//       declarations: [SaveDialogComponent, ButtonComponent],
//       imports: [
//         MaterialModule,
//         FlexLayoutModule,
//         FontAwesomeTestingModule,
//         HttpClientTestingModule,
//         TranslateModule.forRoot(),
//         FormsModule,
//         RouterTestingModule.withRoutes([]),
//         BrowserAnimationsModule,
//         MatTooltipModule,
//       ],
//       providers: [
//         { provide: OAuthStorage, useValue: authStorage },
//         { provide: MAT_DIALOG_DATA, useValue: data },
//         { provide: MatDialogRef, useValue: matDialogRef },
//         { provide: FeatureService, useValue: featureService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     // Workaround: see https://github.com/thymikee/jest-preset-angular/issues/122
//     // noinspection JSUnusedLocalSymbols
//     Object.defineProperty(window, 'getComputedStyle', {
//       value: () => ({
//         getPropertyValue: (prop) => '',
//       }),
//     });
//     fixture = TestBed.createComponent(SaveDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
