import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistroUnidadComponent } from './form-registro-unidad/form-registro-unidad.component';
import { TablaUnidadesAcademicasComponent } from './tabla-unidades-academicas/tabla-unidades-academicas.component';
import { UnidadAcademicaComponent } from './unidad-academica.component';

const routes: Routes = [
  {
    path: '',
    component: UnidadAcademicaComponent,
    children: [
      {
        path: 'tabla-unidad-academica',
        component: TablaUnidadesAcademicasComponent,
      }, {
        path: 'registro-unidad-academica',
        component: FormRegistroUnidadComponent,
      }, {
        path: '',
        redirectTo: 'tabla-unidad-academica',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'tabla-unidad-academica',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadAcademicaRoutingModule { }
