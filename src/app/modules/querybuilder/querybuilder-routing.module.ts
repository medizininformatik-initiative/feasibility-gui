import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component'
import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component'

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: QuerybuilderEditorComponent },
  { path: 'overview', component: QuerybuilderOverviewComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerybuilderRoutingModule {}
