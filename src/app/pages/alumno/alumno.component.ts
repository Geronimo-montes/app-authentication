import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  template: `
  <div class="row col-md-12">
    <img class="img" src="assets/alumnos.png" alt="Alumnos">

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Lista alumnos'" [type]="'primary'"
        [icon]="'assets/tabla-unidades.png'" [routerLink]="router.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar alumno'" [type]="'success'"
        [icon]="'assets/add-alumno.png'" [routerLink]="router.registro">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  public router: any = {
    tabla: '/pages/alumno/tabla-alumnos',
    registro: '/pages/alumno/registro-alumno',
  };

  constructor() { }

  ngOnInit(): void {

  }
}
