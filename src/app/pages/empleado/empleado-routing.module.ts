import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';
import { FormRegistroEmpleadoComponent } from './form-registro-empleado/form-registro-empleado.component';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    children: [
      {
        path: 'tabla-empleados',
        component: TablaEmpleadoComponent,
      }, {
        path: 'registro-empleado',
        component: FormRegistroEmpleadoComponent,
      }, {
        path: '',
        redirectTo: 'tabla-empleados',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'tabla-empleados',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule { }
