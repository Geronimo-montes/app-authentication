import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Erol, UserModel } from '../@core/data/userModel';
import { RoleProviderService } from '../@core/mock/rolProvider.service';
import { UserProvierService } from '../@core/mock/UserProvider.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <app-one-column-layout *ngIf="loadingSuccess">
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
    private userService: UserModel,
    private rolService: RoleProviderService,
  ) { }

  ngOnInit(): void {
    this.loadingSuccess = false;

    this.rolService.getRole()
      .pipe(take(1))
      .subscribe(rol => {
        switch (rol) {
          case Erol.AUXILIAR, Erol.JEFATURA:
            this.userService.getUser$()
              .pipe(take(1))
              .subscribe(usuario => {
                // se filtran los controles a los que no tiene acceso
                this.menu = MENU_ITEMS.filter(i =>
                  i.title !== 'Unidades Académicas' && i.title !== 'Empleados');
                // Agregamos el idunidad para la ruta de alumnos
                this.menu.map(i => {
                  if (i.title === 'Alumnos') i.link += `/${usuario.idunidad}`;
                });
              });
            break;

          case Erol.DIRECTOR:
            // se filtran los controles a los que no tiene acceso
            this.menu = MENU_ITEMS.filter(i => i.title !== 'Alumnos');
            break;
        }
        this.loadingSuccess = true;
      });
  }
}

