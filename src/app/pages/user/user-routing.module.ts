import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaUserComponent } from './table/table.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'tabla',
        component: TablaUserComponent,
      }, {
        path: 'registro',
        component: UserComponent,
      }, {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'tabla',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
