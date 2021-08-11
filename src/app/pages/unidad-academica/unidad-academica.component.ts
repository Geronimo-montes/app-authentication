import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidad-academica',
  template: `
    <div class="row col-md-12">
      <img src="assets/unidades.png" alt="Unidad Académica">

      <div class="pointer ml-4" *nbIsGranted="['view', 'unidad']">
        <app-card-item-menu [title]="'Lista Unidades Académicas'" [type]="'primary'"
          [icon]="'assets/tabla-unidades.png'" [routerLink]="router.tabla">
        </app-card-item-menu>
      </div>

      <div class="pointer ml-4" *nbIsGranted="['create', 'unidad']">
        <app-card-item-menu [title]="'Registrar Unidad Académica'"
          [type]="'success'" [icon]="'assets/add-unidades.png'" [routerLink]="router.registro">
        </app-card-item-menu>
      </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./unidad-academica.component.scss']
})
export class UnidadAcademicaComponent implements OnInit {

  public router: any = {
    tabla: '/pages/unidad-academica/tabla-unidades-academicas',
    registro: '/pages/unidad-academica/registro-unidad-academica',
  };

  constructor() { }

  ngOnInit(): void {
  }
}
