import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentacion',
  template: `
  <div class="row col-md-12">
    <img  src="assets/documentos.png" alt="Documentación">

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Paquetes de documentos'" [type]="'primary'"
        [icon]="'assets/tabla-document.png'" [routerLink]="router.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar documentación'" [type]="'success'"
        [icon]="'assets/add-document.png'" [routerLink]="router.registro">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./documentacion.component.scss']
})
export class DocumentacionComponent implements OnInit {

  public router: any = {
    tabla: '/pages/documentacion/tabla-documentacion',
    registro: '/pages/documentacion/registro-documentacion',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
