import { CommonModule } from '@angular/common';
import { DataSelectionComponent } from './components/data-selection.component';
import { DataSelectionRoutingModule } from './data-selection-routing.module';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '../../layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [DataSelectionComponent],
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
  ],
})
export class DataSelectionModule {}
