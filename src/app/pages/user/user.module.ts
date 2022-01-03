import { NbCardModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme';
import { NbSelectModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbSpinnerModule } from '@nebular/theme';
import { NbPopoverModule } from '@nebular/theme';
import { NbCheckboxModule } from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';

import { UserComponent } from './user.component';
import { ViewComponent } from './view/view.component';
import { UserRoutingModule } from './user-routing.module';
import { TablaUserComponent } from './table/table.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    // 
    ThemeModule,
    // 
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbSecurityModule,
  ],
  declarations: [
    UserComponent,
    TablaUserComponent,
    ViewComponent,
  ],
})
export class UserModule { }
