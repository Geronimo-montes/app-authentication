import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from '../../environments/environment';
import { LayoutService } from './utils';

import { MockDataModule } from './mock/mock-data.module';

import { UserModel } from './data/userModel';
import { UnidadAcademicaModel } from './data/unidadAcademicaModel';
import { DocumentoModel } from './data/documentoModel';

import { UserProvierService } from './mock/UserProvider.service';
import { UnidadProvierService } from './mock/UnidadProvider.service';
import { DocumentoProvierService } from './mock/DocumentoProvider.service';
import { AlumnoModel } from './data/alumnoModel';
import { AlumnoProvierService } from './mock/AlumnoProvider.service';
import { EmpleadoModel } from './data/empleadoModel';
import { EmpleadoProvierService } from './mock/EmpleadoProvider.service';

const GUARDS = [];

const DATA_SERVICES = [
  // {provide: ClassData, useClass: ClassService},
  { provide: UserModel, useClass: UserProvierService },
  { provide: UnidadAcademicaModel, useClass: UnidadProvierService },
  { provide: DocumentoModel, useClass: DocumentoProvierService },
  { provide: AlumnoModel, useClass: AlumnoProvierService },
  { provide: EmpleadoModel, useClass: EmpleadoProvierService },
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
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    }
  }
}
