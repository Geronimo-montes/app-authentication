import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { environment } from '../../environments/environment';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NbAuthModule } from '@nebular/auth';
import { NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { NbSecurityModule } from '@nebular/security';
import { NbPasswordAuthStrategy } from '@nebular/auth';

import { RolGuard } from './guards';
import { AuthGuard } from './guards';

import { BaseURLInterceptor } from './interceptors';
import { HttpErrorInterceptor } from './interceptors';

import { LayoutService } from './utils';

import { MockDataModule } from './mock/mock-data.module';

import { RoleProviderService } from './mock/rolProvider.service';

import { AuthModel } from './data/auth.model';
import { AuthService } from './mock/AuthProvider.service';
import { UserModel } from './data/user.model';
import { UserService } from './mock/UserProvider.service';
import { FaceIdModel } from './data/faceId.model';
import { FaceIdService } from './mock/FaceIdProvider.service';
import { UserCredentialsModel } from './data/userCredentials.model';
import { UserCredentialsService } from './mock/UserCredentialsProvider.service';


const GUARDS = [RolGuard, AuthGuard];

const DATA_SERVICES = [
  { provide: AuthModel, useClass: AuthService },
  { provide: UserModel, useClass: UserService },
  { provide: FaceIdModel, useClass: FaceIdService },
  { provide: UserCredentialsModel, useClass: UserCredentialsService },
];

const INTERCEPTORES_HTTP = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
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
  ...INTERCEPTORES_HTTP,
  ...MockDataModule.forRoot().providers,

  ...NbAuthModule
    .forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.API_URL,
          login: {
            endpoint: 'sign-in/user-credentials',
            alwaysFail: false,
            method: 'post',
            requireValidToken: true,
            redirect: {
              success: '/pages/users',
              failure: null,
            },
            defaultErrors: ['Correo o contraseña incorrectos, intente nuevamente.'],
            defaultMessages: ['Has validado tus credenciasles exitosamente.'],
          },
          logout: false,
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),
      ],
      forms: {
        login: formSetting,
        logout: { redirecDelay: 0 },
      }
    }).providers,

  ...NbSecurityModule.forRoot({
    accessControl: {
      admin: {
        control: ['*'],
        view: ['*'],
        create: ['*'],
        edit: ['*'],
        add: ['*'],
        delete: ['*'],
        update_data_list: ['*'],
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
