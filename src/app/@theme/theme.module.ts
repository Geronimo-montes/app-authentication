import { NbThemeModule, NbActionsModule, NbCardModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbContextMenuModule, NbMenuModule, NbSearchModule, NbUserModule, NbSpinnerModule, NbFormFieldModule, NbPopoverModule, NbInputModule, NbBadgeModule, NbListModule, } from '@nebular/theme';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablaComponent } from './components/tabla/tabla.component';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';
import { FooterComponent } from './components/footer/footer.component';
import { CardItemMenuComponent } from './components/card-item-menu/card-item-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmacionComponent, FileUploadComponent } from './components';

const NB_MODULES = [
  ReactiveFormsModule,
  FormsModule,
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbActionsModule,
  RouterModule,
  NbCardModule,
  NbSidebarModule,
  NbButtonModule,
  NbContextMenuModule,
  NbMenuModule,
  NbSearchModule,
  NbUserModule,
  NbSpinnerModule,
  NbFormFieldModule,
  NbPopoverModule,
  Ng2SmartTableModule,
  NbInputModule,
  NbBadgeModule,
  NbListModule,
  NbActionsModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  CardItemMenuComponent,
  TablaComponent,
  FileUploadComponent,
  ConfirmacionComponent,
  OneColumnLayoutComponent,
];

const PIPES = [];

const DIRECTIVES = [];


@NgModule({
  imports: [
    CommonModule,
    ...NB_MODULES,
  ],
  exports: [
    CommonModule,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          { name: 'dark' },
        ).providers
      ]
    }
  }
}
