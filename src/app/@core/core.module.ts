// ANGULAR
import { NgModule } from '@angular/core';
import { Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// 
import { throwIfAlreadyLoaded } from './module-import-guard';
// NEBULAR
import { NbAuthModule } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { NbSecurityModule } from '@nebular/security';
// GUARDS
import { RolGuard } from './guards';
import { IsAuthenticateGuard } from './guards';
// DATA SERVICES
import { AuthModel } from './data/auth.model';
import { UserModel } from './data/user.model';
import { FaceIdModel } from './data/faceId.model';
import { UserCredentialsModel } from './data/userCredentials.model';
// DATA CLASS
import { MockDataModule } from './mock/mock-data.module';
import { AuthService } from './mock/AuthProvider.service';
import { UserService } from './mock/UserProvider.service';
import { FaceIdService } from './mock/FaceIdProvider.service';
import { RoleProviderService } from './mock/rolProvider.service';
import { UserCredentialsService } from './mock/UserCredentialsProvider.service';
// INTERCEPTORS
import { URLInterceptorService } from './http';
import { ErrorInterceptorService } from './http';
import { AuthInterceptorService } from './http';
// UTILS
import { LayoutService } from './utils';
import { ToastService } from './utils';
// SETTINGS
import { ACCESS_CONTROL } from './settings';
import { STRATEGIES } from './settings';


const GUARDS = [
  RolGuard,
  IsAuthenticateGuard,
];

const DATA_SERVICES = [
  { provide: AuthModel, useClass: AuthService },
  { provide: UserModel, useClass: UserService },
  { provide: FaceIdModel, useClass: FaceIdService },
  { provide: UserCredentialsModel, useClass: UserCredentialsService },
  { provide: NbRoleProvider, useClass: RoleProviderService },
];

const INTERCEPTORES = [
  { provide: HTTP_INTERCEPTORS, useClass: URLInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];

const UTILS = [
  LayoutService,
  ToastService,
]


export const NB_CORE_PROVIDERS = [
  ...UTILS,
  ...GUARDS,
  ...DATA_SERVICES,
  ...INTERCEPTORES,
  ...MockDataModule.forRoot().providers,
  ...NbAuthModule.forRoot(STRATEGIES).providers,
  ...NbSecurityModule.forRoot(ACCESS_CONTROL).providers,
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
