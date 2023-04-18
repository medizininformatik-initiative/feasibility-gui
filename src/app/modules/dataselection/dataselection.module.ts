import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DisplayGroupComponent } from './components/dataselection-editor/display/display-group/display-group.component';
import { ResultSimpleComponent } from './components/dataselection-editor/result/result-simple/result-simple.component';
import { QuerybuilderModule } from '../querybuilder/querybuilder.module';

@NgModule({
  declarations: [
    DataselectionEditorComponent,
    DisplayGroupComponent,
    ResultSimpleComponent,
  ],
  imports: [
    CommonModule,
    DataselectionRoutingModule,
    SharedModule,
    LayoutModule,
    QuerybuilderModule,
  ],
})
export class DataselectionModule {}
