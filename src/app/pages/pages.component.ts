import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Erol, UserModel } from '../@core/data/userModel';
import { RoleProviderService } from '../@core/mock/rolProvider.service';
import { CONTROLS, FORMS, MENU_ITEMS } from './pages-menu';

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

                this.menu = MENU_ITEMS.filter(i => (i.title !== 'Formularios'));

                // filtramos los controles
                this.menu[1].children = CONTROLS.filter(i =>
                  i.title !== 'Unidades' && i.title !== 'Empleados');

                // Agregamos el idunidad para la ruta de alumnos
                this.menu[1].children.map(i => {
                  if (i.title === 'Alumnos') {
                    i.link += `/${usuario.clave}`;
                  } else if (i.title === 'Alumnos') {
                    i.link += `/${usuario.clave}`;
                  }
                  return i;
                });
              });
            break;

          case Erol.DIRECTOR:
            this.menu = MENU_ITEMS;
            this.menu[1].children = CONTROLS.filter(i => i.title !== 'Alumnos');
            this.menu[2].children = FORMS;
            break;
        }
        this.loadingSuccess = true;
      });
  }
}

