import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: DataselectionEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataselectionRoutingModule {}
