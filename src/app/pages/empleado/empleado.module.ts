import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './empleado.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';
import { FormRegistroEmpleadoComponent } from './form-registro-empleado/form-registro-empleado.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    EmpleadoRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
    NbSelectModule,
    NbIconModule,
  ],
  declarations: [
    EmpleadoComponent,
    TablaEmpleadoComponent,
    FormRegistroEmpleadoComponent
  ],
})
export class EmpleadoModule { }
