import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathSegments } from 'src/app/app-paths';
import { QueryEditorComponent } from './editor/query-editor.component';

const routes: Routes = [
  {
    path: PathSegments.criteria,
    component: QueryEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryEditorRoutingModule {}
