import { CommonModule } from '@angular/common';
import { CriterionComponent } from './components/editor-content/criterion/criterion.component';
import { DataSelectionModule } from '../data-selection/data-selection.module';
import { EditActionBarComponent } from './components/action-bar/edit-action-bar.component';
import { EditorContentComponent } from './components/editor-content/editor-content.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { FeasibilityQueryModule } from '../feasibility-query/feasibility-query.module';
import { FilterTabsComponent } from './components/editor-content/filter-tabs/filter-tabs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileComponent } from './components/editor-content/profile/profile.component';
import { ProfileFilterComponent } from './components/editor-content/profile/profile-filter/profile-filter.component';
import { ProfileHeaderComponent } from './components/editor-content/profile/header/profile-header.component';
import { QueryEditorComponent } from './components/query-editor.component';
import { QueryEditorRoutingModule } from './query-editor.routing.module';
import { SharedFilterModule } from '../shared-filter/shared-filter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenFilterComponent } from './components/editor-content/profile/profile-filter/token-filter/token-filter.component';
import { ProfileTimeFilterComponent } from './components/editor-content/profile/profile-filter/profile-time-restriction/profile-time-filter.component';
import { ProfileReferenceModalComponent } from './components/editor-content/profile/reference/modal-window/profile-reference-modal.component';
import { ProfileReferenceComponent } from './components/editor-content/profile/reference/profile-reference.component';
import { ReferenceFieldTabComponent } from './components/editor-content/profile/reference/reference-field-tab/reference-field-tab.component';
import { PossibleReferencesComponent } from './components/editor-content/profile/reference/possible-references/possible-references.component';

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
    EditorContentComponent,
    CriterionComponent,
    FilterTabsComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    QueryEditorComponent,
    TokenFilterComponent,
    ProfileFilterComponent,
    ProfileTimeFilterComponent,
    ProfileReferenceComponent,
    ProfileReferenceModalComponent,
    ReferenceFieldTabComponent,
    PossibleReferencesComponent,
  ],
  exports: [],
})
export class QueryEditorModule {}
