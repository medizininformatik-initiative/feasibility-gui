import { DataSelectionModule } from './data-selection.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSelectionComponent } from './components/data-selection.component';

const routes: Routes = [{ path: '', component: DataSelectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSelectionRoutingModule {}
