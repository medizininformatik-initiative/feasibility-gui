import { NgModule } from '@angular/core';
import { DataQueryComponent } from './data-query/data-query.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { FileSaverModule } from 'ngx-filesaver';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { DataQueryRoutingModule } from './data-query-routing.module';

@NgModule({
  declarations: [DataQueryComponent],
  exports: [DataQueryComponent],
  imports: [
    DataQueryRoutingModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    FileSaverModule,
    SharedFilterModule,
  ],
})
export class DataQueryModule {}
