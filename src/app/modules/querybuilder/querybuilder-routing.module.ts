import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuerybuilderEditorComponent } from './components/querybuilder-editor/querybuilder-editor.component';
import { ResultComponent } from './components/querybuilder-result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: QuerybuilderEditorComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerybuilderRoutingModule {}
