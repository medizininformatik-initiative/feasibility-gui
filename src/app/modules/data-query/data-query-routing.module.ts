import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataQueryComponent } from './data-query/data-query.component';

const routes: Routes = [{ path: '', component: DataQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataQueryRoutingModule {}
