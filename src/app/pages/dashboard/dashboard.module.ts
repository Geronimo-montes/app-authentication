import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
