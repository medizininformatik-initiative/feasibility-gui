import { AuthGuard } from './core/auth/guards/auth.guard';
import { DataProtectionComponent } from './site/data-protection/data-protection.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/auth/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';
import { DataSelectionComponent } from './modules/data-selection/components/data-selection.component';

export const routes: Routes = [
  {
    path: 'home',
    canLoad: [AuthGuard],
    data: {
      navId: 'home',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Dashboard.Module" */ './modules/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'querybuilder',
    canLoad: [RoleGuard],
    data: {
      navId: 'querybuilder',
      roles: ['main'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Querybuilder.Module" */ './modules/querybuilder/querybuilder.module'
      ).then((m) => m.QuerybuilderModule),
  },
  {
    path: 'options',
    canLoad: [RoleGuard],
    data: {
      navId: 'options',
      roles: ['option'],
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
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Result.Module" */ './modules/querybuilder/querybuilder.module'
      ).then((m) => m.QuerybuilderModule),
  },
  {
    path: 'data-selection',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-selection',
      roles: ['main'],
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
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "SavedQueries.Module" */ './modules/saved-queries/saved-queries.module'
      ).then((m) => m.SavedQueriesModule),
  },
  {
    path: 'data-query',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-query',
      roles: ['main'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DataQuery.Module" */ './modules/data-query/data-query.module'
      ).then((m) => m.DataQueryModule),
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent,
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
