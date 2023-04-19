import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DisplayGroupComponent } from './components/dataselection-editor/display/display-group/display-group.component';
import { DisplayCritGroupComponent } from './components/dataselection-editor/display/display-crit-group/display-crit-group.component';
import { ResultSimpleComponent } from './components/dataselection-editor/result/result-simple/result-simple.component';
import { QuerybuilderModule } from '../querybuilder/querybuilder.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SaveDialogComponent } from './components/dataselection-editor/save/save-dialog/save-dialog.component';

@NgModule({
  declarations: [
    DataselectionEditorComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    ResultSimpleComponent,
    SaveDialogComponent,
  ],
  imports: [
    CommonModule,
    DataselectionRoutingModule,
    SharedModule,
    LayoutModule,
    QuerybuilderModule,
    MatRadioModule,
    MatFormFieldModule,
  ],
})
export class DataselectionModule {}
