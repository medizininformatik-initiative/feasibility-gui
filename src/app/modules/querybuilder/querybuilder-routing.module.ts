import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { QuerybuilderComponent } from './components/querybuilder/querybuilder.component'

const routes: Routes = [{ path: '', component: QuerybuilderComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerybuilderRoutingModule {}
