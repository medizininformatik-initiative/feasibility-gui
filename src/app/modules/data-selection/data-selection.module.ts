import { CommonModule } from '@angular/common';
import { DataSelectionBoxesComponent } from './components/display-profiles/data-selection-boxes/data-selection-boxes.component';
import { DataSelectionComponent } from './components/data-selection.component';
import { DataSelectionRoutingModule } from './data-selection-routing.module';
import { DisplayProfilesComponent } from './components/display-profiles/display-profiles.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '../../layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import { EditFieldsModalComponent } from './components/edit-fields-modal/edit-fields-modal.component';
import { EditFilterModalComponent } from './components/edit-filter-modal/edit-filter-modal.component';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { ProfileCodeComponent } from './components/edit-filter-modal/profile-code/profile-code.component';
import { ProfileTimeRestrictionComponent } from './components/edit-filter-modal/profile-time-restriction/profile-time-restriction.component';
import { QuerybuilderModule } from '../querybuilder/querybuilder.module';
import { DisplayTranslationPipe } from 'src/app/shared/pipes/DisplayTranslationPipe ';
import { DisplaySearchtreeComponent } from './components/display-searchtree/display-searchtree.component';

@NgModule({
  declarations: [
    DataSelectionComponent,
    DataSelectionBoxesComponent,
    EditFieldsModalComponent,
    DisplayProfilesComponent,
    DisplaySearchtreeComponent,
    EditFilterModalComponent,
    ProfileCodeComponent,
    ProfileTimeRestrictionComponent,
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
    SnackBarComponent,
    QuerybuilderModule,
    SharedFilterModule,
    DisplayTranslationPipe,
  ],
  exports: [DisplayProfilesComponent],
})
export class DataSelectionModule {}
