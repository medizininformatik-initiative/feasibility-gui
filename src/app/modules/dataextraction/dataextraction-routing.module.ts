import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataextractionEditorComponent } from './components/dataextraction-editor.component';
import { DataextractionPreviewComponent } from './components/dataextraction-preview/dataextraction-preview.component';
import { EditorPreviewGuard } from './guards/editor-preview.guard';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: DataextractionEditorComponent },
  {
    path: 'editor/preview',
    component: DataextractionPreviewComponent,
    canActivate: [EditorPreviewGuard],
  }, // Add the new route
  ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataextractionRoutingModule {}
