import { CommonModule } from '@angular/common';
import { CriterionComponent } from './components/editor-content/criterion/criterion.component';
import { DataSelectionModule } from '../data-selection/data-selection.module';
import { EditActionBarComponent } from './components/action-bar/edit-action-bar.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FilterTabsComponent } from './components/editor-content/filter-tabs/filter-tabs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileComponent } from './components/editor-content/profile/profile.component';
import { ProfileHeaderComponent } from './components/editor-content/profile/header/profile-header.component';
import { QueryEditorComponent } from './components/query-editor.component';
import { QueryEditorRoutingModule } from './query-editor.routing.module';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    QueryEditorRoutingModule,
    SharedModule,
    OverlayModule,
    SharedFilterModule,
    FlexLayoutModule,
    MaterialModule,
    FeasibilityQueryModule,
    DataSelectionModule,
  ],
  declarations: [
    EditorHeaderComponent,
    EditActionBarComponent,
    CriterionComponent,
    FilterTabsComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    QueryEditorComponent,
  ],
  exports: [],
})
export class QueryEditorModule {}
