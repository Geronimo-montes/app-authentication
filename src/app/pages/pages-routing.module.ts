import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '../@core/guards';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'alumno',
        loadChildren: () => import('./alumno/alumno.module')
          .then(m => m.AlumnoModule),
      }, {
        path: 'unidad-academica',
        loadChildren: () => import('./unidad-academica/unidad-academica.module')
          .then(m => m.UnidadAcademicaModule),
        canActivate: [RolGuard],
      }, {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module')
          .then(m => m.EmpleadoModule),
        canActivate: [RolGuard],
      }, {
        path: 'documentacion',
        loadChildren: () => import('./documentacion/documentacion.module')
          .then(m => m.DocumentacionModule),
      }, {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule),
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}