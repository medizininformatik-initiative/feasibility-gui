import { NgModule } from '@angular/core';
import { QueryEditorComponent } from './editor/query-editor.component';
import { CommonModule } from '@angular/common';
import { QueryEditorRoutingModule } from './query-editor.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { CriterionComponent } from './criterion/criterion.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FilterTabsComponent } from './filter-tabs/filter-tabs.component';
import { EditTimeRestrictionComponent } from '../feasibility-query/components/editor/criterion-modal/time-restriction/edit-time-restriction.component';

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
