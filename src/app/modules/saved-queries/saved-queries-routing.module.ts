import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedQueriesComponent } from './components/saved-queries/saved-queries.component';

const routes: Routes = [{ path: '', component: SavedQueriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedQueriesRoutingModule {}
