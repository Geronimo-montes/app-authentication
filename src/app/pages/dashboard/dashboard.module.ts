import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NbCardModule } from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';


@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    NbCardModule,
    NbSecurityModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
