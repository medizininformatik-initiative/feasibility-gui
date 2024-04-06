import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataextractionRoutingModule } from './dataextraction-routing.module';
import { DataextractionEditorComponent } from './components/dataextraction-editor.component';
import { ProfileSectionComponent } from './components/profile-section/profile-section.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsManagerComponent } from './components/forms-manager/forms-manager.component';
import { ValueSetFilterComponent } from './components/value-set-filter/value-set-filter.component';
import { FhirPathComponent } from './components/fhir-path/fhir-path.component';
import { FhirPathExpressionsComponent } from './components/fhir-path-expressions/fhir-path-expressions.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataextractionPreviewComponent } from './components/dataextraction-preview/dataextraction-preview.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    DataextractionEditorComponent,
    ProfileSectionComponent,
    DynamicFormComponent,
    FormsManagerComponent,
    ValueSetFilterComponent,
    FhirPathComponent,
    FhirPathExpressionsComponent,
    DataextractionPreviewComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    DataextractionRoutingModule,
    SharedModule,
    LayoutModule,
    MatTooltipModule,
  ],
})
export class DataextractionModule {}
