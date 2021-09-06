import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentacionComponent } from './documentacion.component';
import { FormRegistroDocumentacionComponent } from './form-registro-documentacion/form-registro-documentacion.component';
import { TablaDocumentacionComponent } from './tabla-documentacion/tabla-documentacion.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentacionComponent,
    children: [
      {
        path: 'tabla-documentacion',
        component: TablaDocumentacionComponent,
      }, {
        path: 'registro-documentacion',
        component: FormRegistroDocumentacionComponent,
      }, {
        path: 'update-documentacion/:idpaquete',
        component: FormRegistroDocumentacionComponent,
      }, {
        path: '',
        redirectTo: 'tabla-documentacion',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'tabla-documentacion',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentacionRoutingModule { }
