import { CommonModule } from '@angular/common';
import { ConceptComponent } from './components/querybuilder-editor-new-design/edit/edit-attributes/concept/concept.component';
import { CriteriaStageComponent } from './components/querybuilder-editor-new-design/stage/criteria-stage.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DisplayCriteriaGroupComponent } from './components/querybuilder-editor-new-design/criteria/display-criteria-group/display-criteria-group.component';
import { DisplayGroupComponent } from './components/querybuilder-editor-new-design/criteria/display-criteria-group/display-group/display-group.component';
import { DisplayTimeRestrictionComponent } from './components/querybuilder-editor/display/display-time-restriction/display-time-restriction.component';
import { EditCriterionModalComponent } from './components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-criterion-modal.component';
import { EditValueFilterConceptLineComponent } from './components/querybuilder-editor/edit/edit-value-filter-concept-line/edit-value-filter-concept-line.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatInputNumberDirective } from './components/querybuilder-editor/edit/mat-input-number.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PreStageComponent } from './components/querybuilder-editor-new-design/pre-stage/pre-stage.component';
import { QuantityComparatorComponent } from './components/querybuilder-editor-new-design/edit/edit-attributes/quantity/quantity-comparator/quantity-comparator.component';
import { QuantityComponent } from './components/querybuilder-editor-new-design/edit/edit-attributes/quantity/quantity.component';
import { QuantityRangeComponent } from './components/querybuilder-editor-new-design/edit/edit-attributes/quantity/quantity-range/quantity-range.component';
import { QueryBoxFrontComponent } from './components/querybuilder-overview/saved-queries/query-box-front/query-box-front.component';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor-new-design/querybuilder-editor/querybuilder-editor.component';
//import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
import { QuerybuilderRoutingModule } from './querybuilder-routing.module';
import { ResultDetailsDialogComponent } from './components/querybuilder-editor/result/result-details-dialog/result-details-dialog.component';
import { ResultSimpleComponent } from './components/querybuilder-editor/result/result-simple/result-simple.component';
import { SearchComponent } from './components/querybuilder-editor-new-design/search/search.component';
import { SearchTreeTermEntryDataselectionComponent } from './components/querybuilder-editor/search/dataselection/search-tree-term-entry-dataselection/search-tree-term-entry-dataselection.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleTemplateComponent } from './components/querybuilder-overview/saved-queries/single-template/single-template.component';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { EditReferenceCriteriaModalComponent } from './components/querybuilder-editor-new-design/edit/edit-reference-criteria-modal/edit-reference-criteria-modal.component';
import { EditTimeRestrictionComponent } from './components/querybuilder-editor-new-design/edit/edit-time-restriction/edit-time-restriction.component';
import { BeforeFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-time-restriction/before-filter/before-filter.component';
import { BetweenFilterComponent } from './components/querybuilder-editor-new-design/edit/edit-time-restriction/between-filter/between-filter.component';

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
    //QuerybuilderOverviewComponent,
    DisplayGroupComponent,
    MatInputNumberDirective,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    EditTimeRestrictionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    SingleTemplateComponent,
    QueryBoxFrontComponent,
    SearchTreeTermEntryDataselectionComponent,
    SearchComponent,
    PreStageComponent,
    CriteriaStageComponent,
    DisplayCriteriaGroupComponent,
    EditCriterionModalComponent,
    EditReferenceCriteriaModalComponent,
    QuantityComponent,
    QuantityRangeComponent,
    QuantityComparatorComponent,
    ConceptComponent,
    BeforeFilterComponent,
    BetweenFilterComponent,
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
  ],
  exports: [
    SearchComponent,
    DisplayGroupComponent,
    EditValueFilterConceptLineComponent,
    DisplayTimeRestrictionComponent,
    ResultSimpleComponent,
    ResultDetailsDialogComponent,
    DisplayGroupComponent,
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
