import { DisplayDataSelectionComponent } from './components/editor/display/display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDataSelectionComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full', data: { animation: 'Search' } },
  { path: 'search', component: SearchDataSelectionComponent, data: { animation: 'Search' } },
  { path: 'editor', component: DisplayDataSelectionComponent, data: { animation: 'Editor' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSelectionRoutingModule {}
