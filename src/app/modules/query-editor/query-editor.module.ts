import { CommonModule } from '@angular/common';
import { CriterionComponent } from './components/criterion/criterion.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FilterTabsComponent } from './components/filter-tabs/filter-tabs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
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
  ],
  declarations: [CriterionComponent, FilterTabsComponent, QueryEditorComponent],
  exports: [],
})
export class QueryEditorModule {}
