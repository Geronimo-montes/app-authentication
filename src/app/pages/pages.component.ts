import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthModel } from '../@core/data/auth.model';
import { RoleProviderService } from '../@core/mock/rolProvider.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public menu: NbMenuItem[] = [];
  public loadingSuccess: boolean = false; // bandera que indica cuando se puede renderizar la pagina. Primero se carga los datos de usuario y se realiza una modificacion en el menu sidbar dependiendo de los permisos asignados.

  constructor(
    private userService: AuthModel,
    private rolService: RoleProviderService,
  ) { }

  ngOnInit(): void {
    this.menu = MENU_ITEMS;


  }
}

