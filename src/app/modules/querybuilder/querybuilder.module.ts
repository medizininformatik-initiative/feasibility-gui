import { AllowedUnitsComponent } from './components/querybuilder-editor/edit/criterion-modal/quantity/allowed-units/allowed-units.component';
import { AttributeFilterComponent } from './components/querybuilder-editor/edit/criterion-modal/attribute-filter/attribute-filter.component';
import { BoolLogicSwitchComponent } from './components/querybuilder-editor/criteria/display-criteria-group/bool-logic-switch/bool-logic-switch.component';
import { CommonModule } from '@angular/common';
import { ConceptComponent } from './components/querybuilder-editor/edit/criterion-modal/concept/concept.component';
import { CriteriaStageComponent } from './components/querybuilder-editor/stage/criteria-stage.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DisplayCriteriaGroupComponent } from './components/querybuilder-editor/criteria/display-criteria-group/display-criteria-group.component';
import { DisplayGroupComponent } from './components/querybuilder-editor/criteria/display-criteria-group/display-group/display-group.component';
import { EditCriterionModalComponent } from './components/querybuilder-editor/edit/criterion-modal/edit-criterion-modal.component';
import { EditReferenceCriteriaModalComponent } from './components/querybuilder-editor/edit/reference-criteria-modal/edit-reference-criteria-modal.component';
import { FileSaverModule } from 'ngx-filesaver';
import { LayoutModule } from 'src/app/layout/layout.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PreStageComponent } from './components/querybuilder-editor/pre-stage/pre-stage.component';
import { QuantityComparatorComponent } from './components/querybuilder-editor/edit/criterion-modal/quantity/quantity-comparator/quantity-comparator.component';
import { QuantityComparisionSelectComponent } from './components/querybuilder-editor/edit/criterion-modal/quantity/quantity-comparision-select/quantity-comparision-select.component';
import { QuantityComponent } from './components/querybuilder-editor/edit/criterion-modal/quantity/quantity.component';
import { QuantityRangeComponent } from './components/querybuilder-editor/edit/criterion-modal/quantity/quantity-range/quantity-range.component';
import { QueryBoxFrontComponent } from './components/querybuilder-overview/saved-queries/query-box-front/query-box-front.component';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component';
import { QuerybuilderRoutingModule } from './querybuilder-routing.module';
import { ReferenceComponent } from './components/querybuilder-editor/edit/reference-criteria-modal/reference/reference.component';
import { ResultComponent } from './components/querybuilder-result/result.component';
import { ResultDetailModalComponent } from './components/querybuilder-result/result-detail-modal/result-detail-modal.component';
import { SaveQueryModalComponent } from './components/querybuilder-result/save-dialog/save-dialog.component';
import { SearchComponent } from './components/querybuilder-editor/search/search.component';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleResultComponent } from './components/querybuilder-result/simple-result/simple-result.component';
import { SingleTemplateComponent } from './components/querybuilder-overview/saved-queries/single-template/single-template.component';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import { ValueFilterComponent } from './components/querybuilder-editor/edit/criterion-modal/value-filter/value-filter.component';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { TimerestrictionTypeSelectorComponent } from './components/querybuilder-editor/edit/criterion-modal/time-restriction/timerestriction-type-selector/timerestriction-type-selector.component';
import { BeforeFilterComponent } from './components/querybuilder-editor/edit/criterion-modal/time-restriction/before-filter/before-filter.component';
import { BetweenFilterComponent } from './components/querybuilder-editor/edit/criterion-modal/time-restriction/between-filter/between-filter.component';
import { EditTimeRestrictionComponent } from './components/querybuilder-editor/edit/criterion-modal/time-restriction/edit-time-restriction.component';
import { ConsentSwitchesComponent } from './components/querybuilder-editor/stage/consent-switches/consent-switches.component';

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
    DisplayGroupComponent,
    SingleTemplateComponent,
    QueryBoxFrontComponent,
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
    EditTimeRestrictionComponent,
    SaveQueryModalComponent,
    TimerestrictionTypeSelectorComponent,
    ConsentSwitchesComponent,
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
    DisplayGroupComponent,
    DisplayGroupComponent,
    DisplayCriteriaGroupComponent,
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
