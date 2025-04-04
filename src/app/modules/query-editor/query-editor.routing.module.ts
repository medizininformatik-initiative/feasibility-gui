import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathSegments } from 'src/app/app-paths';
import { QueryEditorComponent } from './editor/query-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: PathSegments.criteria,
    pathMatch: 'full',
  },
  {
    path: `${PathSegments.criteria}/:id`,
    component: QueryEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryEditorRoutingModule {}
