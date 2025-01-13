import { DisplayDataSelectionComponent } from './components/editor/display/display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDataSelectionComponent } from './components/search/search.component';
import { PathSegments } from 'src/app/app-paths';

const routes: Routes = [
  {
    path: '',
    redirectTo: PathSegments.search,
    pathMatch: 'full',
    data: { animation: 'Data_Selection_Search', title: 'TAB_TITLE.DATA_SELECTION.SEARCH' },
  },
  {
    path: PathSegments.search,
    component: SearchDataSelectionComponent,
    data: { animation: 'Data_Selection_Search', title: 'TAB_TITLE.DATA_SELECTION.SEARCH' },
  },
  {
    path: PathSegments.editor,
    component: DisplayDataSelectionComponent,
    data: { animation: 'Data_Selection_Editor', title: 'TAB_TITLE.DATA_SELECTION.EDITOR' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSelectionRoutingModule {}
