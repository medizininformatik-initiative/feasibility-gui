import { CommonModule } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SavedQueriesComponent } from './components/saved-queries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavedQueriesRoutingModule } from './saved-queries-routing.module';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { CohortComponent } from './components/cohort/cohort.component';
import { FeasibilityComponent } from './components/feasibility/feasibility.component';

@NgModule({
  declarations: [SavedQueriesComponent, CohortComponent, FeasibilityComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    FileSaverModule,
    SavedQueriesRoutingModule,
    SharedFilterModule,
    MaterialModule,
  ],
  exports: [SavedQueriesComponent],
})
export class SavedQueriesModule {}
