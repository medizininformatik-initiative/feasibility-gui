import { AuthGuard } from './core/auth/guards/auth.guard';
import { DataProtectionComponent } from './site/data-protection/data-protection.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './core/auth/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'dataselection',
    canLoad: [RoleGuard],
    data: {
      navId: 'dataselection',
      roles: ['main'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Dataselection.Module" */ './modules/dataselection/dataselection.module'
      ).then((m) => m.DataselectionModule),
  },
  {
    path: 'dataextraction',
    canLoad: [RoleGuard],
    data: {
      navId: 'dataextraction',
      roles: ['main'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Dataextraction.Module" */ './modules/dataextraction/dataextraction.module'
      ).then((m) => m.DataextractionModule),
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
