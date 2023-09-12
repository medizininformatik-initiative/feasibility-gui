import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';

@NgModule({
  declarations: [DataselectionEditorComponent],
  imports: [CommonModule, DataselectionRoutingModule],
})
export class DataselectionModule {}
