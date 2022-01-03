import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
  <div class="row col-md-12">
    <img  src="assets/usuarios.png" alt="Documentación">

    <div class="pointer ml-4" >
      <app-card-item-menu [title]="'Tabla de usuarios'" [type]="'primary'"
        [icon]="'assets/tabla.png'" [routerLink]="router.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar Usuario'" [type]="'success'"
        [icon]="'assets/add-user.png'" [routerLink]="router.registro">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public router: any = {
    tabla: '/pages/users/tabla',
    registro: '/pages/users/registro',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
