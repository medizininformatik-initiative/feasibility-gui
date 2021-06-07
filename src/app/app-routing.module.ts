import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/auth/guards/auth.guard'
import { RoleGuard } from './core/auth/guards/role.guard'

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
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Querbybuilder.Module" */ './modules/querybuilder/querybuilder.module'
      ).then((m) => m.QuerybuilderModule),
  },
  {
    path: 'options',
    canLoad: [RoleGuard],
    data: {
      navId: 'options',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Querbybuilder.Module" */ './modules/options/options.module'
      ).then((m) => m.OptionsModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
