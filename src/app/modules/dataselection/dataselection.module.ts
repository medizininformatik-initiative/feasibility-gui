import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchInputComponent } from './components/dataselection-editor/search/search-input/search-input.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DisplayGroupComponent } from './components/dataselection-editor/display/display-group/display-group.component';
import { DisplayCritGroupComponent } from './components/dataselection-editor/display/display-crit-group/display-crit-group.component';
import { ResultSimpleComponent } from './components/dataselection-editor/result/result-simple/result-simple.component';
import { SearchTreeOverlayContentComponent } from './components/dataselection-editor/search/search-tree-overlay-content/search-tree-overlay-content.component';
import { SearchTreeHeaderComponent } from './components/dataselection-editor/search/search-tree-header/search-tree-header.component';

@NgModule({
  declarations: [
    DataselectionEditorComponent,
    SearchInputComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    ResultSimpleComponent,
    SearchTreeOverlayContentComponent,
    SearchTreeHeaderComponent,
  ],
  imports: [CommonModule, DataselectionRoutingModule, SharedModule, LayoutModule],
})
export class DataselectionModule {}
