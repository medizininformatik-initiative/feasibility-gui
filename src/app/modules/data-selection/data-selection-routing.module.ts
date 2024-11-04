import { DisplayDataSelectionComponent } from './components/editor/display/display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDataSelectionComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
    data: { animation: 'Data_Selection_Search' },
  },
  {
    path: 'search',
    component: SearchDataSelectionComponent,
    data: { animation: 'Data_Selection_Search' },
  },
  {
    path: 'editor',
    component: DisplayDataSelectionComponent,
    data: { animation: 'Data_Selection_Editor' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSelectionRoutingModule {}
