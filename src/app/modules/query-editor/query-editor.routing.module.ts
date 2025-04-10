import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathSegments } from 'src/app/app-paths';
import { QueryEditorComponent } from './components/query-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: PathSegments.criterion,
    pathMatch: 'full',
  },
  {
    path: `${PathSegments.criterion}/:id`,
    component: QueryEditorComponent,
  },
  {
    path: `${PathSegments.profile}/:id`,
    component: QueryEditorComponent,
    data: { hideSideNav: false },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryEditorRoutingModule {}
