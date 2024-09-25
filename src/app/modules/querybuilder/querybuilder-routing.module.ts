import { NgModule } from '@angular/core';
//import { QuerybuilderOverviewComponent } from './components/querybuilder-overview/querybuilder-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component';
import { ResultComponent } from './components/querybuilder-result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: QuerybuilderEditorComponent },
  //{ path: 'overview', component: QuerybuilderOverviewComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerybuilderRoutingModule {}
