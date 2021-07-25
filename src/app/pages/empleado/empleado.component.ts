import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  template: `
  <div class="row col-md-12">
    <img src="assets/empleados.png" alt="Alumnos">

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Lista de empleados'" [type]="'primary'"
        [icon]="'assets/tabla-empleado.png'" [routerLink]="router.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar de empleado'" [type]="'success'"
        [icon]="'assets/add-empleado.png'" [routerLink]="router.registro">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Asignar auxiliar'" [type]="'warning'"
        [icon]="'assets/add-empleado.png'" [routerLink]="router.asignar">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public router: any = {
    tabla: '/pages/empleado/tabla-empleado',
    registro: '/pages/empleado/registro-empleado',
    asignar: '/pages/empleado/asignar-empleado',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
