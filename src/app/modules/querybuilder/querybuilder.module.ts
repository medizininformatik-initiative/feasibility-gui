import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuerybuilderRoutingModule } from './querybuilder-routing.module'
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component'
import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DisplayQueryComponent } from './components/display-query/display-query.component'
import { DisplayGroupComponent } from './components/display-group/display-group.component'
import { DisplayCritGroupComponent } from './components/display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from './components/display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from './components/bool-logic-switch/bool-logic-switch.component'
import { SearchInputComponent } from './components/search-input/search-input.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { SearchOverlayTreeComponent } from './components/search-overlay-tree/search-overlay-tree.component'
import { SearchHeaderTreeComponent } from './components/search-header-tree/search-header-tree.component'
import { SearchInputTermEntryComponent } from './components/search-input-term-entry/search-input-term-entry.component'
import { SearchFooterTreeComponent } from './components/search-footer-tree/search-footer-tree.component'
import { EnterCriterionListComponent } from './components/enter-criterion-list/enter-criterion-list.component'

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
    SearchOverlayTreeComponent,
    SearchHeaderTreeComponent,
    SearchInputTermEntryComponent,
    SearchFooterTreeComponent,
    EnterCriterionListComponent,
  ],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule, OverlayModule],
})
export class QuerybuilderModule {}
