import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserProvierService } from './UserProvider.service';
import { AlumnoProvierService } from './AlumnoProvider.service';
import { UnidadProvierService } from './UnidadProvider.service';
import { DocumentoProvierService } from './DocumentoProvider.service';
import { EmpleadoProvierService } from './EmpleadoProvider.service';
import { RoleProviderService } from './rolProvider.service';
import { FileProvierService } from './FileProvider.service';
import { ToastService } from './root-provider';
import { PaqueteDocProvierService } from './PaqueteDocProvider.service';

const SERVICES = [
  UserProvierService,
  AlumnoProvierService,
  UnidadProvierService,
  DocumentoProvierService,
  PaqueteDocProvierService,
  EmpleadoProvierService,
  RoleProviderService,
  FileProvierService,

  ToastService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
