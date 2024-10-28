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

@NgModule({
  declarations: [CohortDefinitionComponent, DataSelectionComponent],
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
  ],
})
export class DataQueryModule {}
