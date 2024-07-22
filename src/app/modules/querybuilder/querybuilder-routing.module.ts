import { NgModule } from '@angular/core';
//import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { QuerybuilderEditorComponent } from './components/qb-editor2/querybuilder-editor/querybuilder-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: QuerybuilderEditorComponent },
  //{ path: 'overview', component: QuerybuilderOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerybuilderRoutingModule {}
