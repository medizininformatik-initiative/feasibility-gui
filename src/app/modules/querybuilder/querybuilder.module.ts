import { AllowedUnitsComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/quantity/allowed-units/allowed-units.component';
import { AttributeFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/attribute-filter/attribute-filter.component';
import { BeforeFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-time-restriction/before-filter/before-filter.component';
import { BetweenFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-time-restriction/between-filter/between-filter.component';
import { BoolLogicSwitchComponent } from './components/querybuilder-editor-new-design/criteria/display-criteria-group/bool-logic-switch/bool-logic-switch.component';
import { CommonModule } from '@angular/common';
import { ConceptComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/concept/concept.component';
import { CriteriaStageComponent } from './components/querybuilder-editor-new-design/stage/criteria-stage.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DisplayCriteriaGroupComponent } from './components/querybuilder-editor-new-design/criteria/display-criteria-group/display-criteria-group.component';
import { DisplayGroupComponent } from './components/querybuilder-editor-new-design/criteria/display-criteria-group/display-group/display-group.component';
import { DisplayTimeRestrictionComponent } from './components/querybuilder-editor/display/display-time-restriction/display-time-restriction.component';
import { EditCriterionModalComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-criterion-modal.component';
import { EditReferenceCriteriaModalComponent } from './components/querybuilder-editor-new-design/edit/edit-reference-criteria-modal/edit-reference-criteria-modal.component';
import { EditValueFilterConceptLineComponent } from './components/querybuilder-editor/edit/edit-value-filter-concept-line/edit-value-filter-concept-line.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatInputNumberDirective } from './components/querybuilder-editor/edit/mat-input-number.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PreStageComponent } from './components/querybuilder-editor-new-design/pre-stage/pre-stage.component';
import { QuantityComparatorComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/quantity/quantity-comparator/quantity-comparator.component';
import { QuantityComparisionSelectComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/quantity/quantity-comparision-select/quantity-comparision-select.component';
import { QuantityComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/quantity/quantity.component';
import { QuantityRangeComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/quantity/quantity-range/quantity-range.component';
import { QueryBoxFrontComponent } from './components/querybuilder-overview/saved-queries/query-box-front/query-box-front.component';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor-new-design/querybuilder-editor/querybuilder-editor.component';
import { QuerybuilderRoutingModule } from './querybuilder-routing.module';
import { ReferenceComponent } from './components/querybuilder-editor-new-design/edit/edit-reference-criteria-modal/reference/reference.component';
import { ResultComponent } from './components/querybuilder-result/result/result.component';
import { ResultDetailsDialogComponent } from './components/querybuilder-editor/result/result-details-dialog/result-details-dialog.component';
import { ResultSimpleComponent } from './components/querybuilder-editor/result/result-simple/result-simple.component';
import { SearchComponent } from './components/querybuilder-editor-new-design/search/search.component';
import { SearchTreeFooterComponent } from './components/querybuilder-editor/search/search-tree-footer/search-tree-footer.component';
import { SearchTreeTermEntryDataselectionComponent } from './components/querybuilder-editor/search/dataselection/search-tree-term-entry-dataselection/search-tree-term-entry-dataselection.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleResultComponent } from './components/querybuilder-result/simple-result/simple-result.component';
import { SingleTemplateComponent } from './components/querybuilder-overview/saved-queries/single-template/single-template.component';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import { ValueFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/value-filter/value-filter.component';
//import { DisplayCriterionComponent } from './components/querybuilder-editor/display/display-criterion/display-criterion.component';
//import { DisplayCritGroupComponent } from './components/querybuilder-editor/display/display-crit-group/display-crit-group.component';
//import { DisplayLinkedCriterionComponent } from './components/querybuilder-editor/display/display-linked-criterion/display-linked-criterion.component';
//import { DisplayQueryComponent } from './components/querybuilder-editor/display/display-query/display-query.component';
//import { DisplayValueFilterComponent } from './components/querybuilder-editor/display/display-value-filter/display-value-filter.component';
//import { EditCriterionComponent } from './components/querybuilder-editor/edit/edit-criterion/edit-criterion.component';
//import { EditGroupConnectionComponent } from './components/querybuilder-editor/edit/edit-group-connection/edit-group-connection.component';
//import { EditValueFilterComponent } from './components/querybuilder-editor/edit/edit-value-filter/edit-value-filter.component';
//import { EnterCriterionListComponent } from './components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component';
//import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
//import { SaveDialogComponent } from './components/querybuilder-editor/save/save-dialog/save-dialog.component';
//import { SavedQueriesComponent } from './components/querybuilder-overview/saved-queries/saved-queries.component';
//import { SearchInputComponent } from './components/querybuilder-editor/search/search-input/search-input.component';
//import { SearchTextHeaderComponent } from './components/querybuilder-editor/search/search-text-header/search-text-header.component';
//import { SearchTextOverlayContentComponent } from './components/querybuilder-editor/search/search-text-overlay-content/search-text-overlay-content.component';
//import { SearchTextTermEntryComponent } from './components/querybuilder-editor/search/search-text-term-entry/search-text-term-entry.component';
//import { SearchTreeHeaderComponent } from './components/querybuilder-editor/search/search-tree-header/search-tree-header.component';
//import { SearchTreeOverlayContentComponent } from './components/querybuilder-editor/search/search-tree-overlay-content/search-tree-overlay-content.component';
//import { SearchTreeTermEntryComponent } from './components/querybuilder-editor/search/search-tree-term-entry/search-tree-term-entry.component';
//import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { EditTimeRestrictionComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-time-restriction/edit-time-restriction.component';
import { ResultDetailModalComponent } from './components/querybuilder-result/result-detail-modal/result-detail-modal.component';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';

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
    SearchComponent,
    QuerybuilderEditorComponent,
    BoolLogicSwitchComponent,
    //QuerybuilderOverviewComponent,
    //DisplayQueryComponent,
    DisplayGroupComponent,
    //DisplayCritGroupComponent,
    //DisplayCriterionComponent,
    //BoolLogicSwitchComponent,
    //SearchInputComponent,
    //SearchTreeOverlayContentComponent,
    //SearchTreeHeaderComponent,
    //SearchTreeTermEntryComponent,
    SearchTreeFooterComponent,
    //EnterCriterionListComponent,
    //SearchTextOverlayContentComponent,
    //SearchTextHeaderComponent,
    //SearchTextTermEntryComponent,
    //EditCriterionComponent,
    //EditValueFilterComponent,
    MatInputNumberDirective,
    //DisplayValueFilterComponent,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    EditTimeRestrictionComponent,
    //EditGroupConnectionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    //SingleQueryComponent,
    //SaveDialogComponent,
    //DisplayLinkedCriterionComponent,
    SingleTemplateComponent,
    QueryBoxFrontComponent,
    //SavedQueriesComponent,
    //QueryBoxEndComponent,
    SearchTreeTermEntryDataselectionComponent,
    SearchComponent,
    PreStageComponent,
    CriteriaStageComponent,
    DisplayCriteriaGroupComponent,
    EditCriterionModalComponent,
    EditReferenceCriteriaModalComponent,
    SimpleResultComponent,
    ResultComponent,
    BeforeFilterComponent,
    BetweenFilterComponent,
    AllowedUnitsComponent,
    QuantityComparisionSelectComponent,
    ReferenceComponent,
    AttributeFilterComponent,
    ValueFilterComponent,
    QuantityRangeComponent,
    QuantityComparatorComponent,
    ConceptComponent,
    QuantityComponent,
    ResultDetailModalComponent,
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
    SnackBarComponent,
    SharedFilterModule,
  ],
  exports: [
    EditTimeRestrictionComponent,
    SearchComponent,
    //SearchInputComponent,
    //SearchTreeOverlayContentComponent,
    //SearchTreeHeaderComponent,
    //SearchTreeTermEntryComponent,
    SearchTreeFooterComponent,
    //EnterCriterionListComponent,
    //SearchTextOverlayContentComponent,
    //SearchTextHeaderComponent,
    //SearchTextTermEntryComponent,
    DisplayGroupComponent,
    //DisplayCritGroupComponent,
    //DisplayCriterionComponent,
    //DisplayQueryComponent,
    //EditCriterionComponent,
    //EditValueFilterComponent,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    DisplayGroupComponent,
    //DisplayCritGroupComponent,
    //DisplayCriterionComponent,
    //DisplayQueryComponent,
    //DisplayLinkedCriterionComponent,
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
