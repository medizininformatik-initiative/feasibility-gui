import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuerybuilderRoutingModule } from './querybuilder-routing.module';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component';
import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DisplayQueryComponent } from './components/querybuilder-editor/display/display-query/display-query.component';
import { DisplayGroupComponent } from './components/querybuilder-editor/display/display-group/display-group.component';
import { DisplayCritGroupComponent } from './components/querybuilder-editor/display/display-crit-group/display-crit-group.component';
import { DisplayCriterionComponent } from './components/querybuilder-editor/display/display-criterion/display-criterion.component';
import { BoolLogicSwitchComponent } from './components/querybuilder-editor/display/bool-logic-switch/bool-logic-switch.component';
import { SearchInputComponent } from './components/querybuilder-editor/search/search-input/search-input.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchTreeOverlayContentComponent } from './components/querybuilder-editor/search/search-tree-overlay-content/search-tree-overlay-content.component';
import { SearchTreeHeaderComponent } from './components/querybuilder-editor/search/search-tree-header/search-tree-header.component';
import { SearchTreeTermEntryComponent } from './components/querybuilder-editor/search/search-tree-term-entry/search-tree-term-entry.component';
import { SearchTreeFooterComponent } from './components/querybuilder-editor/search/search-tree-footer/search-tree-footer.component';
import { EnterCriterionListComponent } from './components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component';
import { SearchTextOverlayContentComponent } from './components/querybuilder-editor/search/search-text-overlay-content/search-text-overlay-content.component';
import { SearchTextHeaderComponent } from './components/querybuilder-editor/search/search-text-header/search-text-header.component';
import { SearchTextTermEntryComponent } from './components/querybuilder-editor/search/search-text-term-entry/search-text-term-entry.component';
import { EditCriterionComponent } from './components/querybuilder-editor/edit/edit-criterion/edit-criterion.component';
import { EditValueFilterComponent } from './components/querybuilder-editor/edit/edit-value-filter/edit-value-filter.component';
import { MatInputNumberDirective } from './components/querybuilder-editor/edit/mat-input-number.directive';
import { DisplayValueFilterComponent } from './components/querybuilder-editor/display/display-value-filter/display-value-filter.component';
import { EditSingleCriterionComponent } from './components/querybuilder-editor/edit/edit-single-criterion/edit-single-criterion.component';
import { EditValueFilterConceptLineComponent } from './components/querybuilder-editor/edit/edit-value-filter-concept-line/edit-value-filter-concept-line.component';
import { DisplayTimeRestrictionComponent } from './components/querybuilder-editor/display/display-time-restriction/display-time-restriction.component';
import { EditTimeRestrictionComponent } from './components/querybuilder-editor/edit/edit-time-restriction/edit-time-restriction.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { EditGroupConnectionComponent } from './components/querybuilder-editor/edit/edit-group-connection/edit-group-connection.component';
import { ResultSimpleComponent } from './components/querybuilder-editor/result/result-simple/result-simple.component';
import { ResultDetailsDialogComponent } from './components/querybuilder-editor/result/result-details-dialog/result-details-dialog.component';
import { DisplayEntitiesComponent } from './components/querybuilder-editor/display/display-entities/display-entities.component';
import { SingleQueryComponent } from './components/querybuilder-overview/single-query/single-query.component';
import { SaveDialogComponent } from './components/querybuilder-editor/save/save-dialog/save-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileSaverModule } from 'ngx-filesaver';
import { DisplayLinkedCriterionComponent } from './components/querybuilder-editor/display/display-linked-criterion/display-linked-criterion.component';

export const FORMATS_GERMAN = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    QuerybuilderEditorComponent,
    QuerybuilderOverviewComponent,
    DisplayQueryComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    DisplayCriterionComponent,
    BoolLogicSwitchComponent,
    SearchInputComponent,
    SearchTreeOverlayContentComponent,
    SearchTreeHeaderComponent,
    SearchTreeTermEntryComponent,
    SearchTreeFooterComponent,
    EnterCriterionListComponent,
    SearchTextOverlayContentComponent,
    SearchTextHeaderComponent,
    SearchTextTermEntryComponent,
    EditCriterionComponent,
    EditValueFilterComponent,
    MatInputNumberDirective,
    DisplayValueFilterComponent,
    EditSingleCriterionComponent,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    EditTimeRestrictionComponent,
    EditGroupConnectionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    DisplayEntitiesComponent,
    SingleQueryComponent,
    SaveDialogComponent,
    DisplayLinkedCriterionComponent,
  ],
  imports: [
    CommonModule,
    QuerybuilderRoutingModule,
    SharedModule,
    LayoutModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FileSaverModule,
  ],
  exports: [
    SearchInputComponent,
    SearchTreeOverlayContentComponent,
    SearchTreeHeaderComponent,
    SearchTreeTermEntryComponent,
    SearchTreeFooterComponent,
    EnterCriterionListComponent,
    SearchTextOverlayContentComponent,
    SearchTextHeaderComponent,
    SearchTextTermEntryComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    DisplayCriterionComponent,
    DisplayQueryComponent,
    EditCriterionComponent,
    EditValueFilterComponent,
    EditSingleCriterionComponent,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    DisplayCriterionComponent,
    DisplayQueryComponent,
    DisplayLinkedCriterionComponent,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: FORMATS_GERMAN },
  ],
})
export class QuerybuilderModule {}
