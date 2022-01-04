import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbMenuModule } from '@nebular/theme';
import { NbToastrModule } from '@nebular/theme';
import { NbWindowModule } from '@nebular/theme';
import { NbDialogModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';

import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-*' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
