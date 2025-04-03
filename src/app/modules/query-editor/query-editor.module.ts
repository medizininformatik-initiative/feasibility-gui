import { NgModule } from '@angular/core';
import { QueryEditorComponent } from './editor/query-editor.component';
import { CommonModule } from '@angular/common';
import { QueryEditorRoutingModule } from './query-editor.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';

@NgModule({
  imports: [
    CommonModule,
    QueryEditorRoutingModule,
    SharedModule,
    OverlayModule,
    SharedFilterModule,
  ],
  declarations: [QueryEditorComponent],
  exports: [],
})
export class QueryEditorModule {}
