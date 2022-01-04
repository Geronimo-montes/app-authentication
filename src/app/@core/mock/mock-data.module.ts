import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './AuthProvider.service';
import { RoleProviderService } from './rolProvider.service';
import { UserService } from './UserProvider.service';
import { FaceIdService } from './FaceIdProvider.service';
import { UserCredentialsService } from './UserCredentialsProvider.service';

const SERVICES = [
  AuthService,
  UserService,
  FaceIdService,
  UserCredentialsService,
  RoleProviderService,
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
