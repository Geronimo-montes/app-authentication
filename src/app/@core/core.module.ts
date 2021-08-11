import { throwIfAlreadyLoaded } from './module-import-guard';
import { environment } from '../../environments/environment';
import { LayoutService } from './utils';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

import { MockDataModule } from './mock/mock-data.module';

import { UserModel } from './data/userModel';
import { UserProvierService } from './mock/UserProvider.service';

import { UnidadAcademicaModel } from './data/unidadAcademicaModel';
import { UnidadProvierService } from './mock/UnidadProvider.service';

import { DocumentoModel } from './data/documentoModel';
import { DocumentoProvierService } from './mock/DocumentoProvider.service';

import { AlumnoModel } from './data/alumnoModel';
import { AlumnoProvierService } from './mock/AlumnoProvider.service';

import { EmpleadoModel } from './data/empleadoModel';
import { EmpleadoProvierService } from './mock/EmpleadoProvider.service';

import { RoleProviderService } from './mock/rolProvider.service';

import { AuthGuard, RolGuard, AuthenticatedGuard } from './guards';
import { FileModel } from './data/fileModel';
import { FileProvierService } from './mock/FileProvider.service';

const GUARDS = [
  AuthGuard,
  RolGuard,
  AuthenticatedGuard,
];

const DATA_SERVICES = [
  { provide: UserModel, useClass: UserProvierService },
  { provide: UnidadAcademicaModel, useClass: UnidadProvierService },
  { provide: DocumentoModel, useClass: DocumentoProvierService },
  { provide: AlumnoModel, useClass: AlumnoProvierService },
  { provide: EmpleadoModel, useClass: EmpleadoProvierService },
  { provide: FileModel, useClass: FileProvierService },
];

const formSetting: any = {
  redirectDelay: 1000,
  strategy: 'email',
  remember: false,
  showMessages: {
    success: true,
    error: true,
  },
};

export const NB_CORE_PROVIDERS = [
  LayoutService,
  ...GUARDS,
  ...DATA_SERVICES,
  ...MockDataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.API_URL,
        refreshToken: {
          endpoint: 'auth/refreshToken',
          method: 'post',
          alwaysFail: false,
          defaultErrors: ['No se pudo revalidar sesion. Intente mas tarde.'],
          defaultMessages: ['Sesion extendida con exito.'],
        },
        login: {
          endpoint: 'auth/sign-in',
          alwaysFail: false,
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: '/pages/dashboard',
            failure: null,
          },
          defaultErrors: ['Correo o contraseña incorrectos, intente nuevamente.'],
          defaultMessages: ['Has validado tus credenciasles exitosamente.'],
        },
        logout: false,
        token: {
          class: NbAuthJWTToken,
          key: 'data.token',
        },
      }),
    ],
    forms: {
      login: formSetting,
      logout: { redirecDelay: 0 },
    }
  }).providers,
  NbSecurityModule.forRoot({
    /** c         deribados
     * perfil
     * unidad   unidad-asignada
     * documento  detalle_documento
     * empleado
     * reporte
     * 
     */
    accessControl: {
      director: {
        control: ['perfil', 'unidad', 'documento', 'empleado', 'reporte'],
        view: ['*'],
        create: ['*'],
        edit: ['*'],
        add: ['*'],
        delete: ['*'],
        update_data_list: ['*'],
      },
      jefatura: {
        control: ['perfil', 'alumno', 'documento', 'unidad-asignada', 'reporte'],
        view: ['perfil', 'alumno', 'documento', 'unidad-asignada', 'reporte'],
        create: [],
        edit: [],
        add: ['detalle_documento'],
        delete: ['detalle_documento'],
        update_data_list: ['alumno', 'documento'],
      },
      auxiliar: {
        control: ['perfil', 'alumno', 'documento', 'unidad-asignada', 'reporte'],
        view: ['perfil', 'alumno', 'documento', 'unidad-asignada', 'reporte'],
        create: [],
        edit: [],
        add: ['detalle_documento'],
        delete: ['detalle_documento'],
        update_data_list: ['alumno', 'documento'],
      }
    }
  }).providers,
  { provide: NbRoleProvider, useClass: RoleProviderService },
];

@NgModule({
  imports: [],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS, ...GUARDS],
    }
  }
}
