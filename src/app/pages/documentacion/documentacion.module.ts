import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentacionComponent } from './documentacion.component';
import { TablaDocumentacionComponent } from './tabla-documentacion/tabla-documentacion.component';
import { FormRegistroDocumentacionComponent } from './form-registro-documentacion/form-registro-documentacion.component';
import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewPackComponent } from './view-pack/view-pack.component';
import { NbSecurityModule } from '@nebular/security';



@NgModule({
  imports: [
    DocumentacionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    NbPopoverModule,
    NbSelectModule,
    NbCheckboxModule,
    NbIconModule,
    NbSecurityModule,
  ],
  declarations: [
    DocumentacionComponent,
    TablaDocumentacionComponent,
    FormRegistroDocumentacionComponent,
    ViewPackComponent,
  ],
})
export class DocumentacionModule { }
