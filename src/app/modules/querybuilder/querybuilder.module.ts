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
import { SearchTreeOverlayComponent } from './components/querybuilder-editor/search/search-tree-overlay/search-tree-overlay.component'
import { SearchTreeHeaderComponent } from './components/querybuilder-editor/search/search-tree-header/search-tree-header.component'
import { SearchInputTermEntryComponent } from './components/querybuilder-editor/search/search-input-term-entry/search-input-term-entry.component'
import { SearchTreeFooterComponent } from './components/querybuilder-editor/search/search-tree-footer/search-tree-footer.component'
import { EnterCriterionListComponent } from './components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component'

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
    SearchTreeOverlayComponent,
    SearchTreeHeaderComponent,
    SearchInputTermEntryComponent,
    SearchTreeFooterComponent,
    EnterCriterionListComponent,
  ],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule, OverlayModule],
})
export class QuerybuilderModule {}
