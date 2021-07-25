import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadAcademicaComponent } from './unidad-academica.component';
import { UnidadAcademicaRoutingModule } from './unidad-academica-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { TablaUnidadesAcademicasComponent } from './tabla-unidades-academicas/tabla-unidades-academicas.component';
import { FormRegistroUnidadComponent } from './form-registro-unidad/form-registro-unidad.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbPopoverModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    UnidadAcademicaRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
  ],
  declarations: [
    UnidadAcademicaComponent,
    TablaUnidadesAcademicasComponent,
    FormRegistroUnidadComponent,
  ],
})
export class UnidadAcademicaModule { }
