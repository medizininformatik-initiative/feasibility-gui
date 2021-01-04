import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuerybuilderRoutingModule } from './querybuilder-routing.module'
import { QuerybuilderComponent } from './components/querybuilder/querybuilder.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module' 

@NgModule({
  declarations: [
    QuerybuilderComponent
  ],
  imports: [CommonModule, QuerybuilderRoutingModule, SharedModule, LayoutModule],
})
export class QuerybuilderModule {}
