import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataextractionEditorComponent } from './components/dataextraction-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: DataextractionEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataextractionRoutingModule {}
