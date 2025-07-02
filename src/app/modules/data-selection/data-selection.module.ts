import { CommonModule } from '@angular/common';
import { DataSelectionBoxesComponent } from './components/editor/display/data-selection-boxes/data-selection-boxes.component';
import { DataSelectionRoutingModule } from './data-selection-routing.module';
import { DisplayDataSelectionComponent } from './components/editor/display/display.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '../../layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchDataSelectionComponent } from './components/search/search.component';
import { DisplayProfilesComponent } from './components/editor/display/display-profiles/display-profiles.component';

@NgModule({
  declarations: [
    SearchDataSelectionComponent,
    DisplayDataSelectionComponent,
    DataSelectionBoxesComponent,
    DisplayProfilesComponent,
  ],
  imports: [
    CommonModule,
    DataSelectionRoutingModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FileSaverModule,
    FeasibilityQueryModule,
    SharedFilterModule,
  ],
  exports: [DisplayProfilesComponent, DataSelectionBoxesComponent],
})
export class DataSelectionModule {}
