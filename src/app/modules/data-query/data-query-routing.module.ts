import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohortDefinitionComponent } from './data-query/cohort-definition/cohort-definition.component';
import { DataSelectionComponent } from './data-query/data-selection/data-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'cohort-definition', pathMatch: 'full', data: { animation: 'Search' } },
  { path: 'cohort-definition', component: CohortDefinitionComponent },
  { path: 'data-selection', component: DataSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataQueryRoutingModule {}
