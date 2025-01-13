import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CohortDefinitionComponent } from './data-query/cohort-definition/cohort-definition.component';
import { DataSelectionComponent } from './data-query/data-selection/data-selection.component';
import { PathSegments } from 'src/app/app-paths';

const routes: Routes = [
  {
    path: '',
    redirectTo: PathSegments.cohortDefinition,
    pathMatch: 'full',
    data: { animation: 'Search', title: 'TAB_TITLE.DATA_QUERY.COHORT_DEFINITION' },
  },
  {
    path: PathSegments.cohortDefinition,
    component: CohortDefinitionComponent,
    data: { animation: 'Cohort', title: 'TAB_TITLE.DATA_QUERY.COHORT_DEFINITION' },
  },
  {
    path: PathSegments.dataSelection,
    component: DataSelectionComponent,
    data: { animation: 'DataSelection', title: 'TAB_TITLE.DATA_QUERY.DATA_SELECTION' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataQueryRoutingModule {}
