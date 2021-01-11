import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuerybuilderRoutingModule } from './querybuilder-routing.module'
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component'
import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [QuerybuilderEditorComponent, QuerybuilderOverviewComponent],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule],
})
export class QuerybuilderModule {}
