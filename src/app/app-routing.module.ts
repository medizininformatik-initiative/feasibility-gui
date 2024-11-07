import { DataProtectionComponent } from './site/data-protection/data-protection.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/auth/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'data-query',
  },
  {
    path: 'data-query',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-query',
      roles: ['main'],
      breadcrumb: 'Data Query',
      animation: 'HomePage',
      title: 'Data Query',
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
      animation: 'FeasibilityQueryPage',
      title: 'Feasibility Query',
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
      animation: 'OptionsPage',
      title: 'Options',
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Options.Module" */ './modules/options/options.module').then(
        (m) => m.OptionsModule
      ),
  },
  {
    path: 'data-selection',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-selection',
      roles: ['main'],
      breadcrumb: 'Data Selection',
      animation: 'DataSelectionPage',
      title: 'Data Selection',
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
      animation: 'SavedQueriesPage',
      title: 'Saved Queries',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "SavedQueries.Module" */ './modules/saved-queries/saved-queries.module'
      ).then((m) => m.SavedQueriesModule),
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent,
    data: {
      breadcrumb: 'Data Protection',
      animation: 'DataProtectionPage',
      title: 'Data Protection',
    },
  },
  { path: '', redirectTo: 'data-query', pathMatch: 'full' },
  { path: '**', redirectTo: 'data-query', pathMatch: 'full' },
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
