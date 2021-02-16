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

@NgModule({
  declarations: [
    QuerybuilderEditorComponent,
    QuerybuilderOverviewComponent,
    DisplayQueryComponent,
    DisplayGroupComponent,
    DisplayCritGroupComponent,
    DisplayCriterionComponent,
    BoolLogicSwitchComponent,
  ],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule],
})
export class QuerybuilderModule {}
