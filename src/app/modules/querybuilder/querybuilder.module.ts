import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuerybuilderRoutingModule } from './querybuilder-routing.module'
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component'
import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DisplayQueryComponent } from './components/querybuilder-editor/display/display-query/display-query.component'
import { DisplayGroupComponent } from './components/querybuilder-editor/display/display-group/display-group.component'
import { DisplayCritGroupComponent } from './components/querybuilder-editor/display/display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from './components/querybuilder-editor/display/display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from './components/querybuilder-editor/display/bool-logic-switch/bool-logic-switch.component'
import { SearchInputComponent } from './components/querybuilder-editor/search/search-input/search-input.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { SearchTreeOverlayContentComponent } from './components/querybuilder-editor/search/search-tree-overlay-content/search-tree-overlay-content.component'
import { SearchTreeHeaderComponent } from './components/querybuilder-editor/search/search-tree-header/search-tree-header.component'
import { SearchTreeTermEntryComponent } from './components/querybuilder-editor/search/search-tree-term-entry/search-tree-term-entry.component'
import { SearchTreeFooterComponent } from './components/querybuilder-editor/search/search-tree-footer/search-tree-footer.component'
import { EnterCriterionListComponent } from './components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component'
import { SearchTextOverlayContentComponent } from './components/querybuilder-editor/search/search-text-overlay-content/search-text-overlay-content.component'
import { SearchTextHeaderComponent } from './components/querybuilder-editor/search/search-text-header/search-text-header.component'
import { SearchTextTermEntryComponent } from './components/querybuilder-editor/search/search-text-term-entry/search-text-term-entry.component'

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
  ],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule, OverlayModule],
})
export class QuerybuilderModule {}
