import { CohortDefinitionComponent } from './cohort-definition/cohort-definition.component';
import { CommonModule } from '@angular/common';
import { DataQueryRoutingModule } from './data-query-routing.module';
import { DataSelectionActionBarComponent } from './data-selection/action-bar/data-selection-action-bar.component';
import { DataSelectionComponent } from './data-selection/data-selection.component';
import { DataSelectionModule } from '../data-selection/data-selection.module';
import { DownloadCohortComponent } from './cohort-definition/download-cohort/download-cohort.component';
import { DownloadDataSelectionComponent } from './data-selection/download-data-selection/download-data-selection.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CohortDefinitionComponent,
    DataSelectionComponent,
    DownloadCohortComponent,
    DownloadDataSelectionComponent,
    DataSelectionActionBarComponent,
  ],
  exports: [],
  imports: [
    DataQueryRoutingModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    FileSaverModule,
    SharedFilterModule,
    FeasibilityQueryModule,
    DataSelectionModule,
    MaterialModule,
  ],
})
export class DataQueryModule {}
