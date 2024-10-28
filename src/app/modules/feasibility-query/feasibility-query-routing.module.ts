import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { FeasibilityQueryEditorComponent } from './components/editor/feasibility-query-editor.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full', data: { animation: 'Search' } },
  { path: 'editor', component: FeasibilityQueryEditorComponent, data: { animation: 'Editor' } },
  { path: 'result', component: ResultComponent, data: { animation: 'Result' } },
  { path: 'search', component: SearchComponent, data: { animation: 'Search' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeasibilityQueryRoutingModule {}
