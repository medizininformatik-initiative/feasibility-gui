import { AuthGuard } from './core/auth/guards/auth.guard';
import { DataProtectionComponent } from './site/data-protection/data-protection.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/auth/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-query',
      roles: ['main'],
      breadcrumb: 'Data Query',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DataQuery.Module" */ './modules/data-query/data-query.module'
      ).then((m) => m.DataQueryModule),
  },
  {
    path: 'feasibility-query',
    canLoad: [RoleGuard],
    data: {
      navId: 'feasibility-query',
      roles: ['main'],
      breadcrumb: 'Query Builder',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "FeasibilityQuery.Module" */ './modules/feasibility-query/feasibility-query.module'
      ).then((m) => m.FeasibilityQueryModule),
  },
  {
    path: 'options',
    canLoad: [RoleGuard],
    data: {
      navId: 'options',
      roles: ['option'],
      breadcrumb: 'Options',
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Options.Module" */ './modules/options/options.module').then(
        (m) => m.OptionsModule
      ),
  },
  {
    path: 'result',
    canLoad: [RoleGuard],
    data: {
      navId: 'result',
      roles: ['main'],
      breadcrumb: 'Result',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Result.Module" */ './modules/feasibility-query/feasibility-query.module'
      ).then((m) => m.FeasibilityQueryModule),
  },
  {
    path: 'data-selection',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-selection',
      roles: ['main'],
      breadcrumb: 'Data Selection',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DataSelection.Module" */ './modules/data-selection/data-selection.module'
      ).then((m) => m.DataSelectionModule),
  },
  {
    path: 'saved-queries',
    canLoad: [RoleGuard],
    data: {
      navId: 'saved-queries',
      roles: ['main'],
      breadcrumb: 'Saved Queries',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "SavedQueries.Module" */ './modules/saved-queries/saved-queries.module'
      ).then((m) => m.SavedQueriesModule),
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent,
    data: { breadcrumb: 'Data Protection' },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
