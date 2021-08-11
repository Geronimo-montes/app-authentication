import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  template: `
  <div class="row col-md-12">
    <img class="img" src="assets/alumnos.png" alt="Alumnos">

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Lista alumnos'" [type]="'primary'"
        [icon]="'assets/tabla-unidades.png'" [routerLink]="links.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4" *nbIsGranted="['create', 'alumno']">
      <app-card-item-menu [title]="'Registrar alumno'" [type]="'success'"
        [icon]="'assets/add-alumno.png'" [routerLink]="links.registro">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  public links: { tabla: string, registro: string } = {
    tabla: '/pages/alumno/tabla-alumnos',
    registro: '/pages/alumno/registro-alumno',
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.links.tabla = this.router.url;
  }
}
