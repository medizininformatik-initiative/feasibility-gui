import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchInputComponent } from './components/dataselection-editor/search/search-input/search-input.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DisplayComponent } from './components/dataselection-editor/display/display.component';

@NgModule({
  declarations: [DataselectionEditorComponent, SearchInputComponent, DisplayComponent],
  imports: [CommonModule, DataselectionRoutingModule, SharedModule, LayoutModule],
})
export class DataselectionModule {}
