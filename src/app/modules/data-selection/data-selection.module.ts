import { CommonModule } from '@angular/common';
import { DataSelectionBoxesComponent } from './components/editor/display/data-selection-boxes/data-selection-boxes.component';
import { DataSelectionRoutingModule } from './data-selection-routing.module';
import { DisplayDataSelectionComponent } from './components/editor/display/display.component';
import { EditFieldsModalComponent } from './components/editor/edit-fields-modal/edit-fields-modal.component';
import { EditFilterModalComponent } from './components/editor/edit-filter-modal/edit-filter-modal.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '../../layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileCodeComponent } from './components/editor/edit-filter-modal/profile-code/profile-code.component';
import { ProfileTimeRestrictionComponent } from './components/editor/edit-filter-modal/profile-time-restriction/profile-time-restriction.component';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchDataSelectionComponent } from './components/search/search.component';
import { DisplayProfilesComponent } from './components/editor/display/display-profiles/display-profiles.component';

@NgModule({
  declarations: [
    EditFieldsModalComponent,
    SearchDataSelectionComponent,
    EditFilterModalComponent,
    ProfileCodeComponent,
    ProfileTimeRestrictionComponent,
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
  exports: [DisplayProfilesComponent],
})
export class DataSelectionModule {}
