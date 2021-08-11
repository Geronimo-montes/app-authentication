import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';
import { AuthGuard } from './@core/guards';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard],
  }, {
    path: 'auth',
    component: NbAuthComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NbLoginComponent,
      }, {
        path: 'login',
        component: NbLoginComponent,
      }
    ]
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
