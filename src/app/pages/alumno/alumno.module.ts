import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AlumnoComponent } from './alumno.component';
import { TablaAlumnoComponent } from './tabla/tabla-alumno.component';
import { FormRegistroAlumnoComponent } from './form-registro-alumno/form-registro-alumno.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewAlumnoComponent } from './view-alumno/view-alumno.component';

@NgModule({
  imports: [
    AlumnoRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbPopoverModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
  ],
  declarations: [
    AlumnoComponent,
    TablaAlumnoComponent,
    FormRegistroAlumnoComponent,
    ViewAlumnoComponent,
  ]
})
export class AlumnoModule { }
