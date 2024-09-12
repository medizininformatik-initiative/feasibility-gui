import { CommonModule } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SavedQueriesComponent } from './components/saved-queries/saved-queries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import { SavedQueriesRoutingModule } from './saved-queries-routing.module';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';

@NgModule({
  declarations: [SavedQueriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    FileSaverModule,
    SnackBarComponent,
    SavedQueriesRoutingModule,
    SharedFilterModule,
  ],
  exports: [SavedQueriesComponent],
})
export class SavedQueriesModule {}
