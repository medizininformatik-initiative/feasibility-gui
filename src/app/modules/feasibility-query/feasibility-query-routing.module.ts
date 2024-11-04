import { EditFeasibilityQueryComponent } from './components/editor/edit.component';
import { FeasibilityQuerySearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';
import { ResultComponent } from './components/result/result.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full', data: { animation: 'Feasibility_Search' } },
  {
    path: 'editor',
    component: EditFeasibilityQueryComponent,
    data: { animation: 'Feasibility_Editor' },
  },
  { path: 'result', component: ResultComponent, data: { animation: 'Feasibility_Result' } },
  {
    path: 'search',
    component: FeasibilityQuerySearchComponent,
    data: { animation: 'Feasibility_Search' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeasibilityQueryRoutingModule {}
