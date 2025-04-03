import { DataProtectionComponent } from './site/data-protection/data-protection.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/auth/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';
import { BasePaths } from './app-paths';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: BasePaths.dataQuery,
  },
  {
    path: BasePaths.queryEditor,
    canLoad: [RoleGuard],
    data: {
      navId: BasePaths.queryEditor,
      roles: ['main'],
      breadcrumb: 'Query Editor',
      title: 'Query Editor',
      animation: 'QueryEditorPage',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "QueryEditor.Module" */ './modules/query-editor/query-editor.module'
      ).then((m) => m.QueryEditorModule),
  },
  {
    path: BasePaths.dataQuery,
    canLoad: [RoleGuard],
    data: {
      navId: BasePaths.dataQuery,
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
    path: BasePaths.feasibilityQuery,
    canLoad: [RoleGuard],
    data: {
      navId: BasePaths.feasibilityQuery,
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
    path: BasePaths.options,
    canLoad: [RoleGuard],
    data: {
      navId: BasePaths.options,
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
    path: BasePaths.dataSelection,
    canLoad: [RoleGuard],
    data: {
      navId: BasePaths.dataSelection,
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
  { path: '', redirectTo: BasePaths.dataQuery, pathMatch: 'full' },
  { path: '**', redirectTo: BasePaths.dataQuery, pathMatch: 'full' },
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
