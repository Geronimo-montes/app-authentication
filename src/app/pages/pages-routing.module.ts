import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '../@core/guards';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule),
      }, {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      }, {
        path: '**',
        redirectTo: 'users',
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}