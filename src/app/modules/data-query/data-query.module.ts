import { CohortDefinitionComponent } from './data-query/cohort-definition/cohort-definition.component';
import { CommonModule } from '@angular/common';
import { DataQueryRoutingModule } from './data-query-routing.module';
import { DataSelectionComponent } from './data-query/data-selection/data-selection.component';
import { DataSelectionModule } from '../data-selection/data-selection.module';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { DownloadCohortComponent } from './data-query/cohort-definition/download-cohort/download-cohort.component';
import { DownloadDataSelectionComponent } from './data-query/data-selection/download-data-selection/download-data-selection.component';
import { SaveDataQueryModalComponent } from './save-dialog/save-dialog.component';

@NgModule({
  declarations: [
    CohortDefinitionComponent,
    DataSelectionComponent,
    DownloadCohortComponent,
    DownloadDataSelectionComponent,
    SaveDataQueryModalComponent,
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
