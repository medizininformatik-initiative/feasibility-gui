import { CommonModule } from '@angular/common';
import { CriterionComponent } from './components/criterion/criterion.component';
import { EditActionBarComponent } from './components/action-bar/edit-action-bar.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FilterTabsComponent } from './components/filter-tabs/filter-tabs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileComponent } from './components/profile/profile.component';
import { QueryEditorComponent } from './components/query-editor.component';
import { QueryEditorRoutingModule } from './query-editor.routing.module';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataSelectionModule } from '../data-selection/data-selection.module';

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
    EditActionBarComponent,
    CriterionComponent,
    FilterTabsComponent,
    ProfileComponent,
    QueryEditorComponent,
  ],
  exports: [],
})
export class QueryEditorModule {}
